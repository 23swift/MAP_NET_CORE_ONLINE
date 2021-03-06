using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class POSService : UserIdentity, IPOSService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<POS> posRepo;
        private readonly IRepository<NewAffiliation> newAffRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<Request> requestRepo;
        public POSService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.posRepo = this.unitOfWork.GetRepository<POS>();
            this.newAffRepo = this.unitOfWork.GetRepository<NewAffiliation>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task InsertAsync(POS pos)
        {
            var branch = await branchRepo.FindAsync(pos.BranchId);
            var request = await requestRepo.FindAsync(branch.NewAffiliationId);
            pos.AuditLogGroupId = request.AuditLogGroupId;
            pos.HistoryGroupId = Guid.NewGuid();
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Added",
                groupCode = role,
                user = user,
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId,
                HistoryGroupId = pos.HistoryGroupId
            });
            await posRepo.InsertAsync(pos);
        }

        public async Task<POS> FindAsync(int id)
        {
            return await posRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(POS pos)
        {
            var branch = await branchRepo.FindAsync(pos.BranchId);
            pos.HistoryGroupId = Guid.NewGuid();            
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Updated",
                groupCode = role,
                user = user,
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId,
                HistoryGroupId = pos.HistoryGroupId
            });
            posRepo.Update(pos);
        }

        public async Task Delete(POS pos)
        {
            var branch = await branchRepo.FindAsync(pos.BranchId);
            pos.HistoryGroupId = Guid.NewGuid();            
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Deleted",
                groupCode = role,
                user = user,
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId,
                HistoryGroupId = pos.HistoryGroupId
            });
            posRepo.Delete(pos);
        }

        public async Task<IPagedList<POS>> FindByBranchAsync(int id)
        {
            return await posRepo.GetPagedListAsync(predicate: x => x.BranchId == id);
        }

        public bool ValidatePOS(int id)
        {
            bool isValid = true;
            var newAff = newAffRepo.GetFirstOrDefault(predicate: x => x.Id == id, include: x => x.Include(y => y.Branches)
                                                                                                    .ThenInclude(b => b.POS)
                                                                                                        .ThenInclude(b => b.TerminalDetails));

            foreach (var branch in newAff.Branches)
            {
                if (branch.POS.Count == 0)
                {
                    isValid = false;
                    break;
                }
                else
                {
                    foreach (var pos in branch.POS)
                    {
                        if (pos.TerminalDetails.Count == 0)
                        {
                            isValid = false;
                            break;
                        }
                    }
                }
            }

            return isValid;
        }

        public async Task<POSAutoPopulateFields> FindPosAutoPopulate(int id)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == id,
                                        include: b => b.Include(bb => bb.OIF)
                                            .Include(r => r.NewAffiliation)
                                                .ThenInclude(r => r.CustomerProfile));

            POSAutoPopulateFields pos = new POSAutoPopulateFields
            {
                approvedBy = "",
                businessUnitAO = "",
                requestersBusinessUnit = "",
                businessSignage = branch.OIF.businessSignage,
                merchantDBAName = branch.dbaName,
                merchantDbaAddress = branch.dbaAddress1,
                merchantDbaCity = branch.dbaCity,
                merchantLegalName = branch.NewAffiliation.CustomerProfile.legalName,
                nsp = "",
                segment = ""
            };

            return pos;
        }

        public async Task<bool> ValidatePosForPsServicingAsync(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id, include: r => r.Include(rr => rr.NewAffiliation)
                                                                                                            .ThenInclude(n => n.Branches)
                                                                                                                .ThenInclude(b => b.POS));

            bool isValid = true;

            foreach (var branch in request.NewAffiliation.Branches)
            {
                foreach (var pos in branch.POS)
                {
                    if (pos.emailSubject == null)
                    {
                        isValid = false;
                        break;
                    }
                }
            }

            return isValid;
        }
    }
}