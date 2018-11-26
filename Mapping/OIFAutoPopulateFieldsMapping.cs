using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Mapping
{
    public class OIFAutoPopulateFieldsMapping : Profile
    {
        public OIFAutoPopulateFieldsMapping()
        {
            CreateMap<Branch, OIFAutoPopulateFields>();
        }
    }
}