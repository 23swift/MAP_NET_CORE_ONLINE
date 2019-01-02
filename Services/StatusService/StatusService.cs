namespace MAP_Web.Services
{
    public class StatusService : IStatusService
    {
        public string GetStatus(int status)
        {
            string stat = "";
            switch (status)
            {
                case 1:
                stat = "DRAFT";
                break;
                case 2:
                stat = "FOR AO CHECKER'S REVIEW";
                break;
                case 3:
                stat = "FOR ENCODING";
                break;
                case 4:
                stat = "FOR ENCODER CHECKER REVIEW";
                break;
                case 5:
                stat = "FOR EVALUATION";
                break;
            }

            return stat;
        }
    }
}