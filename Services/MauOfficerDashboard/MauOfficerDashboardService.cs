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
    public class MauOfficerDashboardService : IMauOfficerDashboardService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<AOMaintenance> aoMaintenanceRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IStatusService statusService;

        public MauOfficerDashboardService(IUnitOfWork unitOfWork, IStatusService statusService)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.aoMaintenanceRepo = this.unitOfWork.GetRepository<AOMaintenance>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.statusService = statusService;
        }

        public async Task<List<MauOfficerDashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<MauOfficerDashboardViewModel>();
            var requests = await requestRepo.GetPagedListAsync(include: r => r.Include(rr => rr.NewAffiliation).ThenInclude(ss => ss.CustomerProfile), orderBy: x => x.OrderByDescending(y => y.Id));
            //var branch = await _branchRepo.GetPagedListAsync(include: x => x.Include(xx => xx.Request));
            var testUser = "a012001164";
            var getRequestedBy = await aoMaintenanceRepo.GetFirstOrDefaultAsync(predicate: x => x.userId == testUser);
            foreach (var item in requests.Items)
            {
                var requestedBy = getRequestedBy == null ? "None" : getRequestedBy.firstName + " " + getRequestedBy.lastName;
                dashboardContainer.Add(new MauOfficerDashboardViewModel
                {
                    RequestId = item.Id,
                    RequestedDate = item.CreatedDate.Value,
                    // ReferenceNo = item.Id.ToString().PadLeft(7, '0'),
                    ReferenceNo = item.TrackingNo,
                    RequestedBy = requestedBy,
                    TAT = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours,
                    Status = item.Owner == null ? "For Evaluation" : "For Re-Evaluation", //For Testing Purposes Only
                    isOwned = testUser == item.Owner ? true : false,
                    UserName = item.Owner,
                    BusinessName = item.NewAffiliation.CustomerProfile.legalName,
                    RequestType = "NEW AFFILIATION"
                });
            }
            return dashboardContainer;
        }

        public async Task<List<MauOfficerDashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter)
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

            var dashboardContainer = new List<MauOfficerDashboardViewModel>();
            var requests = await requestRepo.GetPagedListAsync(
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
                                // && r.Status == 20 || r.Status == 22
                                );
            var testUser = "a012001164";
            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new MauOfficerDashboardViewModel
                {
                    RequestId = item.Id,
                    RequestedDate = item.CreatedDate.Value,
                    ReferenceNo = item.TrackingNo,
                    RequestedBy = "Arnold Costamero",
                    TAT = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours,
                    Status = item.Owner == null ? "For Evaluation" : "For Re-Evaluation", //For Testing Purposes Only
                    isOwned = testUser == item.Owner ? true : false,
                    UserName = item.Owner,
                    BusinessName = item.NewAffiliation.CustomerProfile.legalName,
                    RequestType = "NEW AFFILIATION"
                });
            }

            return dashboardContainer;
        }

        public async Task<int> GetListCount()
        {
            var requests = await this.requestRepo.GetPagedListAsync(include: r => r.Include(rr => rr.NewAffiliation).ThenInclude(n => n.CustomerProfile));
            return requests.Items.Count;
        }
    }

}