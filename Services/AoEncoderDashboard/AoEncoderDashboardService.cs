using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.RegularExpressions;
using System;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace MAP_Web.Services
{
    public class AoEncoderDashboardService : UserIdentity, IAoEncoderDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        private readonly IStatusService statusService;

        public AoEncoderDashboardService(IUnitOfWork unitOfWork, IStatusService statusService, IHttpContextAccessor claims): base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
        }

        public void DeleteRequest(Request request)
        {
            requestRepo.Delete(request);
        }

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }

        public async Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter)
        {
            StringComparison comparer = StringComparison.OrdinalIgnoreCase;
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
                                predicate: r => filter != null ? r.CreatedDate.Value.ToString().Contains(filter, comparer) ||
                                                                r.NewAffiliation.CustomerProfile.legalName.Contains(filter, comparer) ||
                                                                r.TrackingNo.Contains(filter, comparer) || (r.CreatedBy != null ? r.CreatedBy.Contains(filter, comparer) : false) ||
                                                                statusService.GetStatus(r.Status).Contains(filter, comparer) ||
                                                                ((int)(DateTime.Now - r.CreatedDate.Value).TotalHours).ToString().Contains(filter, comparer) : true
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
                                .ThenInclude(n => n.CustomerProfile));

            return requests.Items.Count;
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}