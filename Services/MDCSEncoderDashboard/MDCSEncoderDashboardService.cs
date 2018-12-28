using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace MAP_Web.Services
{
    public class MDCSEncoderDashboardService : IMDCSEncoderDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        public MDCSEncoderDashboardService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task<List<DashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await this.requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile)
                                .Include(rr => rr.NewAffiliation.Branches),
                                orderBy: x => x.OrderByDescending(y => y.Id),
                            predicate: r => r.Status == 3);

            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = "Test User",
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }

        public async Task<List<DashboardViewModel>> FilterAsync(FilterCriteriaViewModel criteria)
        {
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await this.requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile)
                                .Include(rr => rr.NewAffiliation.Branches),
                                orderBy: x => x.OrderByDescending(y => y.Id),
                            predicate: r => criteria.status != 0 ? r.Status == criteria.status : true &&
                            criteria.trackingNo != "" ? r.TrackingNo == criteria.trackingNo : true &&
                            criteria.createdDate != null ? r.CreatedDate == criteria.createdDate : true &&
                            criteria.legalName != "" ? r.NewAffiliation.CustomerProfile.legalName == criteria.legalName : true &&
                            criteria.requestType != 0 ? r.RequestType == criteria.requestType : true);

            List<Request> reqList = new List<Request>();

            foreach (var item in requests.Items)
            {
                foreach (var branch in item.NewAffiliation.Branches)
                {
                    if (criteria.dbaName != "")
                    {
                        if (branch.dbaName == criteria.dbaName)
                        {
                            reqList.Add(item);
                            break;
                        }
                    }
                }
            }

            foreach (var item in reqList)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = "Test User",
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }
    }
}