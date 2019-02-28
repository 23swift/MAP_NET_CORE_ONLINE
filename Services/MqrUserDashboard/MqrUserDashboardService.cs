using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using System.Text.RegularExpressions;

namespace MAP_Web.Services
{
    public class MqrUserDashboardService : IMqrUserDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        private readonly IStatusService statusService;
        private readonly IRepository<ApproveWithExceptDetailsMqr> appExMqrRepo;
        private readonly IRepository<ApproveWithReqReasonMqr> appReqMqrRepo;
        private readonly IRepository<ApproveWithExceptDetailsAwr> appExAwrRepo;

        public MqrUserDashboardService(IUnitOfWork unitOfWork, IStatusService statusService)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
            this.appExMqrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsMqr>();
            this.appReqMqrRepo = this.unitOfWork.GetRepository<ApproveWithReqReasonMqr>();
            this.appExAwrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsAwr>();
        }

        public async Task<List<DashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile)
                                .Include(rr => rr.NewAffiliation.Branches),
                                orderBy: x => x.OrderByDescending(y => y.Id));
            //     ,
            // predicate: r => r.Status == 3 || r.Status == 4);

            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = "Test User",
                    requestType = "NEW AFFILIATION",
                    status = statusService.GetStatus(item.Status),
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }

        public async Task InsertMAEFDataAsync(int Id)
        {
            var reqAppEx = await requestRepo.GetFirstOrDefaultAsync(predicate: a => a.Id == Id, include: b => b.Include(bb => bb.MAEF).ThenInclude(bbb => bbb.ApproveWithExceptDetails));

            var reqAppReq = await requestRepo.GetFirstOrDefaultAsync(predicate: a => a.Id == Id, include: b => b.Include(bb => bb.MAEF).ThenInclude(bbb => bbb.ApproveWithReqReason));

            foreach (var item in reqAppEx.MAEF.ApproveWithExceptDetails)
            {
                var appExMqrRec = await appExMqrRepo.GetFirstOrDefaultAsync(predicate: a => a.MAEFId == item.MAEFId);
                if (appExMqrRec == null)
                {
                    await appExMqrRepo.InsertAsync(new ApproveWithExceptDetailsMqr
                    {
                        awerdMqrRequirement = item.awerdRequirement,
                        awerdMqrRemarks = "",
                        awerdRemarks = item.awerdRemarks,
                        awerdMqrDate = item.awerdDate,
                        MAEFId = item.MAEFId
                    });
                }
            }

            foreach (var item in reqAppReq.MAEF.ApproveWithReqReason)
            {
                var appReqMqrRec = await appReqMqrRepo.GetFirstOrDefaultAsync(predicate: a => a.MAEFId == item.MAEFId);
                if (appReqMqrRec == null)
                {
                    if (item.chkAwrsComplied == false)
                    {
                        await appReqMqrRepo.InsertAsync(new ApproveWithReqReasonMqr
                        {
                            awrsMqrRequirement = item.awrsRequirement,
                            awrsMqrRemarks = "",
                            awrsRemarks = item.awrsRemarks,
                            chkAwrsComplied = item.chkAwrsComplied,
                            MAEFId = item.MAEFId
                        });
                    }
                }
            }
        }

        public async Task InsertMQRDataAsync(int Id) 
        {
            var reqAppEx = await requestRepo.GetFirstOrDefaultAsync(predicate: a => a.Id == Id, include: b => b.Include(bb => bb.MAEF).ThenInclude(bbb => bbb.ApproveWithExceptDetailsMqr));

            foreach (var item in reqAppEx.MAEF.ApproveWithExceptDetailsMqr)
            {
                var appExAwrRec = await appExAwrRepo.GetFirstOrDefaultAsync(predicate: a => a.MAEFId == item.MAEFId);
                if (appExAwrRec == null)
                {
                    await appExAwrRepo.InsertAsync(new ApproveWithExceptDetailsAwr
                    {
                        awerdAwrRequirement = item.awerdMqrRequirement,
                        awerdRemarks = item.awerdRemarks,
                        awerdMqrRemarks = item.awerdMqrRemarks,
                        awerdAwrRemarks = "",
                        awerdAwrDate = item.awerdMqrDate,
                        MAEFId = item.MAEFId
                    });
                }
            }
        }

        public async Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter)
        {
            if (Regex.Match(filter, @"^\d+-").Success)
            {
                filter = Regex.Replace(filter, "-", "/");
            }

            filter = filter.ToLower();
            switch (field)
            {
                case "referenceNo":
                    field = "TrackingNo";
                    break;
                case "requestDate":
                    field = "CreatedDate";
                    break;
                case "requestedBy":
                    field = "CreatedBy";
                    break;
                default:
                    field = field.First().ToString().ToUpper() + field.Substring(1);
                    break;
            }

            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await this.requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile),
                                orderBy: x => sortDirection == "asc" ?
                                x.OrderBy(y => field == "Tat" ? (int)(DateTime.Now - y.CreatedDate.Value).TotalHours :
                                                field == "BusinessName" ? y.NewAffiliation.CustomerProfile.legalName : y.GetType().GetProperty(field).GetValue(y)) :
                                x.OrderByDescending(y => field == "Tat" ? (int)(DateTime.Now - y.CreatedDate.Value).TotalHours :
                                                    field == "BusinessName" ? y.NewAffiliation.CustomerProfile.legalName : y.GetType().GetProperty(field).GetValue(y)),
                                pageIndex: pageIndex,
                                pageSize: pageSize,
                                predicate: r => (filter != null ? r.CreatedDate.Value.ToString().ToLower().Contains(filter) ||
                                                                r.NewAffiliation.CustomerProfile.legalName.ToLower().Contains(filter) ||
                                                                r.TrackingNo.ToLower().Contains(filter) || (r.CreatedBy != null ? r.CreatedBy.ToLower().Contains(filter) : false) ||
                                                                statusService.GetStatus(r.Status).ToLower().Contains(filter) ||
                                                                ((int)(DateTime.Now - r.CreatedDate.Value).TotalHours).ToString().ToLower().Contains(filter) : true)
                                                                // && r.Status == 2
                                );

            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = item.CreatedBy,
                    status = statusService.GetStatus(item.Status),
                    requestType = "NEW AFFILIATION",
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }

        public async Task<int> GetListCount()
        {
            var requests = await this.requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile),
                                predicate: r => r.Status == 2);

            return requests.Items.Count;
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}