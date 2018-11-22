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
         void Update(DocumentChecklist documentChecklist);
         void Delete(DocumentChecklist documentChecklist);
    }
}