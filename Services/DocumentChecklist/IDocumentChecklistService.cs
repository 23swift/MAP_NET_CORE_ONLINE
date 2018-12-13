using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IDocumentChecklistService
    {
         Task InsertAsync(DocumentChecklist documentChecklist);
         Task InsertToRequestAsync(int id, int documentId);
         Task<DocumentChecklist> FindAsync(int id);
         Task<IPagedList<DocumentChecklist>> FindByNewAffiliationAsync(int id);
         Task SaveChangesAsync();
         Task<bool> ValidateDocuments(int id);
         Task Update(DocumentChecklist documentChecklist);
         Task Delete(DocumentChecklist documentChecklist);
    }
}