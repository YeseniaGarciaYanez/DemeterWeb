CREATE DATABASE Demeter;

--
USE Demeter;

-- 1. Table: Area
CREATE TABLE Area (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL
);
--agricultor
-- 2. Table: Farmer
CREATE TABLE Farmer (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(45) NOT NULL,
    area_id INT NOT NULL,
    FOREIGN KEY (area_id) REFERENCES Area(id)
);
--cultivo
-- 3. Table: Crop
CREATE TABLE Crop (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    type VARCHAR(30),
    start_date DATE,
    area_id INT,
    FOREIGN KEY (area_id) REFERENCES Area(id)
);

-- 4. Table: Sensor (used for registering variables like pH, Temp, etc.)
CREATE TABLE Sensor (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(30) NOT NULL,         -- Example: pH, EC, Temp
    unit VARCHAR(10) NOT NULL          -- Example: °C, pH, µS/cm
);
--registro sensor
-- 5. Table: SensorRecord (manual data entry)
CREATE TABLE SensorRecord (
    id INT PRIMARY KEY IDENTITY(1,1),
    crop_id INT NOT NULL,
    sensor_id INT NOT NULL,
    value FLOAT NOT NULL,
    timestamp DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (crop_id) REFERENCES Crop(id),
    FOREIGN KEY (sensor_id) REFERENCES Sensor(id)
);
--alerta umbreal
-- 6. Table: AlertThreshold
CREATE TABLE AlertThreshold (
    id INT PRIMARY KEY IDENTITY(1,1),
    sensor_id INT NOT NULL,
    min_value FLOAT,
    max_value FLOAT,
    FOREIGN KEY (sensor_id) REFERENCES Sensor(id)
);

-- 7. Table: Report
CREATE TABLE Report (
    id INT PRIMARY KEY IDENTITY(1,1),
    crop_id INT NOT NULL,
    farmer_id INT NOT NULL,
    type VARCHAR(30) NOT NULL,        -- Examples: sustainability, efficiency, etc.
    description TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (crop_id) REFERENCES Crop(id),
    FOREIGN KEY (farmer_id) REFERENCES Farmer(id)
);

-- 8. Table: Admin
CREATE TABLE Admin (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
--asignacion de agricultor al cultivo
-- 9. Many-to-Many Table: Crop_Farmer
CREATE TABLE Crop_Farmer (
    crop_id INT NOT NULL,
    farmer_id INT NOT NULL,
    PRIMARY KEY (crop_id, farmer_id),
    FOREIGN KEY (crop_id) REFERENCES Crop(id),
    FOREIGN KEY (farmer_id) REFERENCES Farmer(id)
);

CREATE TABLE [User] (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'farmer'))
);

CREATE TABLE CropPhoto (
    id INT PRIMARY KEY IDENTITY(1,1),
    crop_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (crop_id) REFERENCES Crop(id)
);
--alerta generada por evento
CREATE TABLE Alert (
    id INT PRIMARY KEY IDENTITY(1,1),
    crop_id INT NOT NULL,
    sensor_id INT NOT NULL,
    severity VARCHAR(10) NOT NULL CHECK (severity IN ('green', 'yellow', 'red')),
    description TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (crop_id) REFERENCES Crop(id),
    FOREIGN KEY (sensor_id) REFERENCES Sensor(id)
);

--alertas registradas por el agricultor 
CREATE TABLE Notification (
    id INT PRIMARY KEY IDENTITY(1,1),
    farmer_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    is_read BIT DEFAULT 0,
    sent_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (farmer_id) REFERENCES Farmer(id)
);

EXEC sp_rename 'User', 'Users';