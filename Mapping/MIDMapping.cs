using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class MIDMapping : Profile
    {
        public MIDMapping()
        {
            CreateMap<MIDViewModel, MID>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(cp => cp.BranchId, opt => opt.Ignore());
        }
    }
}