using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class POSMapping : Profile
    {
        public POSMapping()
        {
            CreateMap<POSViewModel, POS>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(cp => cp.BranchId, opt => opt.Ignore());
        }
    }
}