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
                            predicate: r => r.Status == 1);

            foreach (var item in requests.Items)
            {
                if (item.NewAffiliation.Branches.Count > 0)
                {
                    foreach (var branch in item.NewAffiliation.Branches)
                    {
                        dashboardContainer.Add(new DashboardViewModel
                        {
                            RequestId = item.Id,
                            requestedDate = item.CreatedDate.Value,
                            businessName = item.NewAffiliation.CustomerProfile.legalName,
                            referenceNo = item.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0'),
                            dbaName = branch.dbaName,
                            requestedBy = "Test User",
                            tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                        });
                    }
                }
                else
                {
                    dashboardContainer.Add(new DashboardViewModel
                    {
                        RequestId = item.Id,
                        requestedDate = item.CreatedDate.Value,
                        businessName = item.NewAffiliation.CustomerProfile.legalName,
                        referenceNo = item.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0'),
                        dbaName = "", //item.NewAffiliation.Branches.SingleOrDefault().dbaName,
                        requestedBy = "Test User",
                        tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                    });
                }
            }

            return dashboardContainer;
        }

        // public async Task<List<DashboardViewModel>> FilterAsync(FilterCriteriaViewModel criteria)
        // {
        //     var requests = await this.requestRepo.GetPagedListAsync(
        //                     include: r => r.Include(rr => rr.NewAffiliation)
        //                         .ThenInclude(n => n.CustomerProfile)
        //                         .Include(rr => rr.NewAffiliation.Branches),
        //                         orderBy: x => x.OrderByDescending(y => y.Id),
        //                     predicate: r => criteria.status != 0 ? r.Status == criteria.status : r.Status == r.Status);
        // }
    }
}