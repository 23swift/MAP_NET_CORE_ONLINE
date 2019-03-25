
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Extensions.Options;
using System.Linq;

namespace MAP_Web.Services
{
    public class StatusService : IStatusService
    {
        private readonly List<StatusConfiguration> status;
        public StatusService(IOptions<List<StatusConfiguration>> _status) {
            status = _status.Value;
        }
        public string GetStatus(int statusId)
        {
            string stat = "";
            stat = status.SingleOrDefault(x => x.Id.Equals(statusId)).Description;
            return stat;
        }
    }
}