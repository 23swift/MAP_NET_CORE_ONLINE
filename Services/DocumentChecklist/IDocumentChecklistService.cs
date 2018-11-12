using System.Threading.Tasks;
using MAP_Web.Models;

namespace MAP_NET_CORE_ONLINE.Services
{
    public interface IDocumentChecklistService
    {
         Task InsertAsync(DocumentChecklist documentChecklist);
         Task<DocumentChecklist> FindAsync(int id);
         Task SaveChangesAsync();
         void Update(DocumentChecklist documentChecklist);
         void Delete(DocumentChecklist documentChecklist);
    }
}