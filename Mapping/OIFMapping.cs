using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class OIFMapping : Profile
    {
        public OIFMapping()
        {
            CreateMap<OIFViewModel, OIF>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(cp => cp.BranchId, opt => opt.Ignore());
        }
    }
}