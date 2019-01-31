using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.RegularExpressions;
using System;

namespace MAP_Web.Services
{
    public class MDCSCheckerDashboardService : IMDCSCheckerDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        private readonly IStatusService statusService;

        public MDCSCheckerDashboardService(IUnitOfWork unitOfWork, IStatusService statusService)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
        }
        
        
        public async Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter)
        {
            if (Regex.Match(filter, @"^\d+-").Success) {
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
                                                                && (r.Status == 3 || r.Status == 4)
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
                                predicate: r => r.Status == 3 || r.Status == 4);

            return requests.Items.Count;
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
                            criteria.trackingNo != null ? r.TrackingNo == criteria.trackingNo : true &&
                            criteria.createdDate != null ? r.CreatedDate == criteria.createdDate : true &&
                            criteria.legalName != null ? r.NewAffiliation.CustomerProfile.legalName.ToLower().Contains(criteria.legalName.ToLower()) : true &&
                            criteria.requestType != 0 ? r.RequestType == criteria.requestType : true);

            IList<Request> reqList = new List<Request>();

            if (criteria.dbaName != null)
            {
                foreach (var item in requests.Items)
                {
                    bool isAdded = false;
                    foreach (var branch in item.NewAffiliation.Branches)
                    {
                        {
                            if (branch.dbaName.ToLower().Contains(criteria.dbaName.ToLower()))
                            {
                                isAdded = true;
                                break;
                            }
                        }
                    }

                    if (isAdded)
                    {
                        reqList.Add(item);
                    }
                }
            }
            else
            {
                reqList = requests.Items;
            }


            foreach (var item in reqList)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = item.CreatedBy,
                    requestType = "NEW AFFILIATION",
                    status = statusService.GetStatus(item.Status),
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }
    }
}