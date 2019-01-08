using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace MAP_Web.Services
{
    public class MDCSUserService : IMDCSUserService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<NewAffiliation> newAffiliationRepo;

        public MDCSUserService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.newAffiliationRepo = this.unitOfWork.GetRepository<NewAffiliation>();
        }

        public bool ValidateMid(int id)
        {
            bool isValid = true;
            var newAff = newAffiliationRepo.GetFirstOrDefault(predicate: x => x.Id == id, include: x => x.Include(y => y.Branches).ThenInclude(z => z.MIDs));

            foreach (var item in newAff.Branches)
            {
                foreach (var item1 in item.MIDs)
                {
                    if (item1.merchId == null || item1.merchId == "" || item1.tid == null || item1.tid == "") {
                         isValid = false;
                    }
                }
            }
            return isValid;
        }
    }
}