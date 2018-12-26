using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MAP_Web.Services
{
    public interface IBdoFormHeaderService
    {
        Task SaveChangesAsync();
        Task<Request> FindAsync(int id);
        void Update(Request request, int status);
        Task<int> ApprovalCountAsync(int requestId);
        Task InsertAsync(ApprovalCount approvalCount);
    }

    
}