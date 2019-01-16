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
                //----green    
                case 5:
                stat = "FOR EVALUATION";
                break;
                case 6:
                stat = "FOR RE-EVALUATION";
                break;
                case 8:
                stat = "FOR APPROVAL";
                break;
                case 9:
                stat = "RETURNED TO AO";
                break;
                case 10:
                stat = "RETURN TO MAMO";
                break;
                case 11:
                stat = "APPROVED";
                break;
                case 12:
                stat = "DECLINED";
                break;
                case 13:
                stat = "APPROVED WR";
                break;
                case 14:
                stat = "APPROVED PC";
                break;
                case 15:
                stat = "APPROVED WE";
                break;
                case 16:
                stat = "APPROVED WRWEPC";
                break;
                case 17:
                stat = "APPROVED WRPC";
                break;
                case 18:
                stat = "APPROVED WRWE";
                break;
                case 22:
                stat = "RETURNED TO AO BY CHECKER";
                break;
                case 23:
                stat = "RETURNED TO AO BY MAMO";
                break;
                case 24:
                stat = "RETURNED TO AO BY APPROVER";
                break;             
            
//green >
/* 
                    stat = "FOR EVALUATION";
                    break;
                case 6:
                    stat = "FOR RE-EVALUATION";
                    break;
                case 7:
                    stat = "FOR PRE-SCREEN";
                    break;
                case 8:
                    stat = "FOR APPROVAL";
                    break;
                case 9:
                    stat = "RETURNED TO AO";
                    break;
                case 10:
                    stat = "RETURNED TO MAMO";
                    break;
                case 11:
                    stat = "APPROVED";
                    break;
                case 12:
                    stat = "DECLINED";
                    break;
                case 13:
                    stat = "APPROVED WR";
                    break;
                case 14:
                    stat = "APPROVED PC";
                    break;
                case 15:
                    stat = "APPROVED WE";
                    break;
                case 16:
                    stat = "APPROVED WRWEPC";
                    break;
                case 17:
                    stat = "APPROVED WRPC";
                    break;
                case 18:
                    stat = "APPROVED WRWE";
                    break;
                case 19:
                    stat = "FOR PROCESSING";
                    break;
                case 20:
                    stat = "FOR CREATION";
                    break;
                case 21:
                    stat = "RE-SUBMITTED";
                    break;
                case 22:
                    stat = "FOR POS PROCESSING";
                    break;
*/
            }
            return stat;
        }
    }
}