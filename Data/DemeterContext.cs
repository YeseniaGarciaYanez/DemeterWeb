using Demeter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Demeter.API.Data
{
    public class DemeterContext : DbContext
    {
        public DemeterContext(DbContextOptions<DemeterContext> options) : base(options) {}

        public DbSet<User> Users => Set<User>();
        public DbSet<Area> Areas => Set<Area>();
        public DbSet<Farmer> Farmers => Set<Farmer>();
        public DbSet<Crop> Crops => Set<Crop>();
        public DbSet<Sensor> Sensors => Set<Sensor>();
        public DbSet<SensorRecord> SensorRecords => Set<SensorRecord>();
        public DbSet<AlertThreshold> AlertThresholds => Set<AlertThreshold>();
        public DbSet<Alert> Alerts => Set<Alert>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<Report> Reports => Set<Report>();
        public DbSet<CropPhoto> CropPhotos => Set<CropPhoto>();
    }
}
