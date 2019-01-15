using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using System.Collections.ObjectModel;

namespace MAP_Web.Services
{
    public class MIDService : IMIDService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<MID> midRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IMapper mapper;
        private readonly IDropdownService dropdownService;
        public MIDService(IUnitOfWork unitOfWork, IMapper mapper, IDropdownService dropdownService)
        {
            this.unitOfWork = unitOfWork;
            this.midRepo = this.unitOfWork.GetRepository<MID>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.mapper = mapper;
            this.dropdownService = dropdownService;
        }
        public async Task InsertAsync(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            await midRepo.InsertAsync(mid);
        }

        public async Task<bool> ValidateMIDCount(int id)
        {
            bool isValid = true;
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == id, include: b => b.Include(bb => bb.MIDs));

            if (branch.MIDs.Count == 10)
            {
                isValid = false;
            }

            return isValid;
        }

        public async Task<MID> FindAsync(int id)
        {
            return await midRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }

        public async Task Update(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            midRepo.Update(mid);
        }

        public async Task Delete(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            midRepo.Delete(mid);
        }

        public async Task<IPagedList<MID>> FindByBranchAsync(int id)
        {
            return await midRepo.GetPagedListAsync(predicate: x => x.BranchId == id);
        }

        public async Task<IList<string>> FindExistingMonitorCodesAsync(IList<MID> mids)
        {
            IList<string> midList = new List<string>();
            var monitorCodes = await dropdownService.GetDropdown("MC");

            foreach (var mid in mids)
            {
                MaintenanceDetails monitorDesc = monitorCodes.MaintenanceDetails.SingleOrDefault(m => m.Code == mid.monitorCode);
                midList.Add(monitorDesc.Value);
            }

            return midList;
        }

        public async Task<IList<string>> FindDefaultMonitorCodesAsync()
        {
            IList<string> midList = new List<string>();
            var monitorCodes = await dropdownService.GetDropdown("MC");

            ICollection<MID> defaultMIDs = new Collection<MID>();
            defaultMIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "OTC",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = false,
                serviceFeeRate = 99.99M,
                status = 1,
            });
            defaultMIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "REGULAR INSTALLMENT",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
            });
            defaultMIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "Installment Zero",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
            });
            defaultMIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "BNPL Reg",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
            });
            defaultMIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "0% BNPL",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
            });


            foreach (var mid in defaultMIDs)
            {
                MaintenanceDetails monitorDesc = monitorCodes.MaintenanceDetails.SingleOrDefault(m => m.Code == mid.monitorCode);
                midList.Add(monitorDesc.Value);
            }

            return midList;
        }

        public async Task SaveMid(string value, int id)
        {
            var currentMid = midRepo.Find(id);
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == currentMid.BranchId);

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "MID -" + "''" + value + "''" + "for Branch: " + branch.dbaName + " Has been Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            currentMid.merchId = value;
            midRepo.Update(currentMid);
        }

        public async Task SaveTid(string value, int id)
        {
            var currentTid = midRepo.Find(id);
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == currentTid.BranchId);

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "DebitTID -" + "''" + value + "''" + "for Branch: " + branch.dbaName + " Has been Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            currentTid.tid = value;
            midRepo.Update(currentTid);
        }

        public async Task<bool> ValidateAndInsertMidAsync(MID mid)
        {
            bool isValid = false;
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId, include: b => b.Include(bb => bb.MIDs));
            int midCount = branch.MIDs.Count;

            if (mid.currencyPhp.HasValue && mid.currencyUsd.HasValue)
            {
                if (mid.currencyPhp.Value && mid.currencyUsd.Value)
                {
                    if (midCount < 9)
                    {
                        isValid = true;
                        MID midPhpModel = new MID();
                        mapper.Map<MID, MID>(mid, midPhpModel);
                        midPhpModel.currencyUsd = false;

                        MID midUsdModel = new MID();
                        mapper.Map<MID, MID>(mid, midUsdModel);
                        midUsdModel.currencyPhp = false;

                        await InsertAsync(midPhpModel);
                        await InsertAsync(midUsdModel);
                    }
                }
            }
            else
            {
                isValid = true;
                await InsertAsync(mid);
            }

            return isValid;
        }

        public async Task<bool> ValidateAndUpdateMidAsync(MIDViewModel mid, int id)
        {
            var currentMid = await FindAsync(id);

            bool isValid = false;
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId, include: b => b.Include(bb => bb.MIDs));
            int midCount = branch.MIDs.Count;

            if (mid.currencyPhp.Value && mid.currencyUsd.Value)
            {
                if (midCount < 10)
                {
                    isValid = true;
                    MID midPhpModel = new MID();
                    MID midUsdModel = new MID();

                    if (currentMid.currencyPhp.HasValue)
                    {
                        if (currentMid.currencyPhp.Value)
                        {
                            mapper.Map<MIDViewModel, MID>(mid, currentMid);
                            currentMid.currencyUsd = false;
                            await Update(currentMid);

                            mapper.Map<MIDViewModel, MID>(mid, midUsdModel);
                            midUsdModel.Id = 0;
                            midUsdModel.BranchId = currentMid.BranchId;
                            midUsdModel.currencyPhp = false;
                            await InsertAsync(midUsdModel);
                        }
                        else
                        {
                            mapper.Map<MIDViewModel, MID>(mid, currentMid);
                            currentMid.currencyPhp = false;
                            await Update(currentMid);

                            mapper.Map<MIDViewModel, MID>(mid, midPhpModel);
                            midPhpModel.Id = 0;
                            midPhpModel.BranchId = currentMid.BranchId;
                            midPhpModel.currencyUsd = false;
                            await InsertAsync(midPhpModel);
                        }
                    }
                }
            }
            else
            {
                isValid = true;
                mapper.Map<MIDViewModel, MID>(mid, currentMid);
                await Update(currentMid);
            }

            return isValid;
        }
    }
}