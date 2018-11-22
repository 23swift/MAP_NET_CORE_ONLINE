using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class BranchMapping : Profile
    {
        public BranchMapping()
        {
            CreateMap<BranchViewModel, Branch>()
                .ForMember(cp => cp.Id, opt => opt.Ignore())
                .ForMember(cp => cp.NewAffiliationId, opt => opt.Ignore());   
        }
    }
}