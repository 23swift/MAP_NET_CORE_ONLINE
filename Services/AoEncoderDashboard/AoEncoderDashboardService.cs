using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace MAP_Web.Services
{
    public class AoEncoderDashboardService : IAoEncoderDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        public AoEncoderDashboardService(IUnitOfWork unitOfWork)
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
                                orderBy: x => x.OrderByDescending(y => y.Id));

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
                            referenceNo = item.TrackingNo, //item.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0'),
                            dbaName = branch.dbaName,
                            requestedBy = "Test User",
                            status = item.Status == 1 ? "DRAFT" : "FOR AO CHECKER'S REVIEW",
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
                        referenceNo = item.TrackingNo, //item.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0'),
                        dbaName = "",
                        requestedBy = "Test User",
                        status = item.Status == 1 ? "DRAFT" : "FOR AO CHECKER'S REVIEW",
                        tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                    });
                }
            }

            return dashboardContainer;
        }
    }
}