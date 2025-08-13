namespace Demeter.API.Models
{
    public class Notification
    {
<<<<<<< HEAD
        public int id { get; set; }
        public int farmer_id { get; set; }
        public Farmer? Farmer { get; set; }
        public string title { get; set; } = "";
        public string message { get; set; } = "";
        public bool is_read { get; set; } = false;
        public DateTime sent_at { get; set; } = DateTime.Now;
    }
}
=======
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public Farmer? Farmer { get; set; }

        public string Title { get; set; } = "";
        public string Message { get; set; } = "";
        public bool IsRead { get; set; } = false;
        public DateTime SentAt { get; set; } = DateTime.Now;
    }
}
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
