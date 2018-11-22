using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class DocumentChecklistMapping : Profile
    {
        public DocumentChecklistMapping()
        {
            CreateMap<DocumentChecklistViewModel, DocumentChecklist>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(dest => dest.fileUpload, opt => opt.Condition((src, dst) => {
                        return !(src.fileUpload == null && dst.fileUpload != null);
                }));
        }
    }
}