<<<<<<< HEAD
﻿using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.DTOs;

namespace Demeter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        private readonly DemeterContext _context;

        public FarmerController(DemeterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Farmer>>> GetFarmers()
        {
            return await _context.Farmers.Include(f => f.Area).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Farmer>> GetFarmer(int id)
        {
            var farmer = await _context.Farmers.Include(f => f.Area).FirstOrDefaultAsync(f => f.id == id);
            if (farmer == null) return NotFound();
            return farmer;
        }

        [HttpPost]
        public async Task<ActionResult<Farmer>> PostFarmer(Farmer farmer)
        {
            _context.Farmers.Add(farmer);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetFarmer", new { id = farmer.id }, farmer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFarmer(int id, Farmer farmer)
        {
            if (id != farmer.id) return BadRequest();
            _context.Entry(farmer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFarmer(int id)
        {
            var farmer = await _context.Farmers.FindAsync(id);
            if (farmer == null) return NotFound();
            _context.Farmers.Remove(farmer);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpGet("cards")]
        public async Task<ActionResult<IEnumerable<FarmerDto>>> GetFarmerCards()
        {
            try
            {
                // Consulta optimizada con la sintaxis correcta
                var farmerData = await (
                    from farmer in _context.Farmers
                    join area in _context.Areas on farmer.area_id equals area.id into farmerArea
                    from fa in farmerArea.DefaultIfEmpty() // LEFT JOIN para área
                    join cf in _context.CropFarmers on farmer.id equals cf.farmer_id into farmerCrops
                    from fc in farmerCrops.DefaultIfEmpty() // LEFT JOIN para cultivos
                    join user in _context.Users on farmer.name equals user.name into farmerUser
                    from fu in farmerUser.DefaultIfEmpty() // LEFT JOIN para usuario
                    let crop = fc != null ? fc.Crop : null
                    let sensorRecords = crop != null ? crop.SensorRecords : null
                    select new
                    {
                        Farmer = farmer,
                        AreaName = fa != null ? fa.name : "",
                        UserEmail = fu != null ? fu.email : "",
                        UserPhoto = fu != null ? fu.photo_url : "",
                        RecordCount = sensorRecords != null ? sensorRecords.Count : 0
                    })
                    .ToListAsync();

                // Agrupamos por agricultor para consolidar los datos
                var groupedData = farmerData
                    .GroupBy(f => f.Farmer.id)
                    .Select(g => new FarmerDto
                    {
                        FarmerId = g.Key,
                        Name = g.First().Farmer.name,
                        Email = g.First().UserEmail,
                        AreaName = g.First().AreaName,
                        GeneratedReports = g.Sum(x => x.RecordCount),
                        PhotoUrl = string.IsNullOrEmpty(g.First().UserPhoto)
    ? $"{Request.Scheme}://{Request.Host}/images/default-farmer.jpg"
    : $"{Request.Scheme}://{Request.Host}/farmers/{g.First().UserPhoto}"
                    })
                    .ToList();

                return Ok(groupedData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "Error interno al procesar la solicitud",
                    Detail = ex.Message
                });
            }
        }


    }

=======
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;



[Route("api/[controller]")]
[ApiController]
public class FarmerController : ControllerBase
{
    private readonly DemeterContext _context;

    public FarmerController(DemeterContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Farmer>>> GetFarmers()
    {
        return await _context.Farmers.Include(f => f.Area).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Farmer>> GetFarmer(int id)
    {
        var farmer = await _context.Farmers.Include(f => f.Area).FirstOrDefaultAsync(f => f.Id == id);
        if (farmer == null) return NotFound();
        return farmer;

    }

    [HttpPost]
    public async Task<ActionResult<Farmer>> PostFarmer(Farmer farmer)
    {
        _context.Farmers.Add(farmer);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetFarmer", new { id = farmer.Id }, farmer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutFarmer(int id, Farmer farmer)
    {
        if (id != farmer.Id) return BadRequest();

        _context.Entry(farmer).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFarmer(int id)
    {
        var farmer = await _context.Farmers.FindAsync(id);
        if (farmer == null) return NotFound();

        _context.Farmers.Remove(farmer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
}

