using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class TerminalDetailsMapping : Profile
    {
        public TerminalDetailsMapping()
        {
            CreateMap<TerminalDetailsViewModel, TerminalDetails>()
                .ForMember(cp => cp.Id, opt => opt.Ignore());
        }
    }
}