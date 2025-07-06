namespace Demeter.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public Farmer? Farmer { get; set; }

        public string Title { get; set; } = "";
        public string Message { get; set; } = "";
        public bool IsRead { get; set; } = false;
        public DateTime SentAt { get; set; } = DateTime.Now;
    }
}
