using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class CustomerProfileService : ICustomerProfileService 
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<CustomerProfile> customerRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<DocumentList> documentListRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;

        private readonly IRepository<ApprovalMatrix> approvalMatrixRepo;
        public CustomerProfileService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.documentListRepo = this.unitOfWork.GetRepository<DocumentList>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.approvalMatrixRepo = this.unitOfWork.GetRepository<ApprovalMatrix>();
        }
        public async Task InsertAsync(CustomerProfile customerProfile)
        {
            Request request = new Request();
            request.AuditLogGroupId = Guid.NewGuid();
            request.Status = 1;
            request.MAEF = new MAEF();
            request.CreatedBy = "Test User";
            request.ApprovalSetup = new ApprovalSetup();
            request.NewAffiliation = new NewAffiliation();
            
            /*for testing insert approvalsetup after saving customer profile 
            request.ApprovalSetup.approvalCount = 2;
            request.ApprovalSetup.rank = "c1";
            request.ApprovalSetup.requestType = 1;*/

           // test strt
           /*var approvalMatrix = await FindApproveMatrixAsync("c1", customerProfile.ownership, request.RequestType);
           request.RequiredApproval = new RequiredApproval();
           request.RequiredApproval.approvalCount = approvalMatrix.approvalCount;
           request.RequiredApproval.rank = "c1";
           request.RequiredApproval.user = "Test User";*/
           // test end

           // test strt
         //  var approvalMatrix = await FindApproveMatrixAsync(customerProfile.ownership, request.RequestType);
          //  request.RequiredApproval = new RequiredApproval();
         //  foreach (var item in approvalMatrix.Items)
         //  {
         //      await request.RequiredApproval.InsertAsync(new RequiredApproval{
         //           approvalCount = item.approvalCount,
         //           rank = item.rank,
         //           user = "Test User",
         //       });
         //  }
          /* request.RequiredApproval = new RequiredApproval();
           request.RequiredApproval.approvalCount = approvalMatrix.Items[0].approvalCount;
           request.RequiredApproval.rank = "c1";
           request.RequiredApproval.user = "Test User";*/
           // test end           

            request.NewAffiliation.AuditLogGroupId = request.AuditLogGroupId;
            request.NewAffiliation.CustomerProfile = customerProfile;
            request.NewAffiliation.CustomerProfile.AuditLogGroupId = request.AuditLogGroupId;

            var documents = await this.documentListRepo.GetPagedListAsync(predicate: d => d.Code == customerProfile.ownership);

            foreach (var item in documents.Items)
            {
                request.NewAffiliation.DocumentChecklists.Add(new DocumentChecklist {
                    documentName = item.Id,
                    AuditLogGroupId = request.AuditLogGroupId
                });
            }

            request.History.Add(new History{
                date = DateTime.Now,
                action = "Request Created",
                groupCode = "Test Group Code",
                user = "Test User",
                AuditLogGroupId = request.AuditLogGroupId
            });
            
            await requestRepo.InsertAsync(request);
            await SaveChangesAsync();

            request.TrackingNo = request.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0');
            requestRepo.Update(request);
        }

        public async Task<CustomerProfile> FindAsync(int id)
        {
            // return await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == id, include: c => c.Include(cp => cp.NewAffiliation.Request));
            return await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(CustomerProfile customerProfile)
        {
            var request = await requestRepo.FindAsync(customerProfile.NewAffiliationId);
            customerProfile.AuditLogGroupId = request.AuditLogGroupId;
            // CustomerProfile.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Request Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = customerProfile.NewAffiliationId,
                AuditLogGroupId = request.AuditLogGroupId
            });

            customerRepo.Update(customerProfile);
        }

        public void Delete(CustomerProfile customerProfile)
        {
            customerRepo.Delete(customerProfile);
        }

        public async Task<CustomerProfile> FindByRequestAsync(int id)
        {
            return await customerRepo.GetFirstOrDefaultAsync(predicate: x => x.NewAffiliationId == id);
        }

        public async Task<IPagedList<ApprovalMatrix>> FindApproveMatrixAsync(string ownership, int requestType)
        {
            var approvalMatrix = await approvalMatrixRepo.GetPagedListAsync(predicate: a => a.ownership == ownership && a.requestType == requestType);
            return approvalMatrix; 
        }      
    
    }
}