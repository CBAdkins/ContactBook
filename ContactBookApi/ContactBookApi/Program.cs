using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Contacts") ?? "Data Source=Contacts.db";
builder.Services.AddDbContext<ContactDb>(opt => opt.UseSqlite(connectionString)) ;
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", () => "Hello World!");


app.MapGet("/contactitems", async (ContactDb db) =>
    await db.Contacts.ToListAsync());

app.MapGet("/contactitems/{id}", async (int id, ContactDb db) =>
    await db.Contacts.FindAsync(id)
        is Contact todo
            ? Results.Ok(todo)
            : Results.NotFound());

app.MapPost("/contactitems", async (Contact contact, ContactDb db) =>
{
    db.Contacts.Add(contact);
    await db.SaveChangesAsync();

    return Results.Created($"/contactitems/{contact.Id}", contact);
});

app.MapPut("/contactitems/{id}", async (int id, Contact inputContact, ContactDb db) =>
{
    var contact = await db.Contacts.FindAsync(id);

    if (contact is null) return Results.NotFound();

    contact.Title = inputContact.Title;
    contact.Surname = inputContact.Surname;
    contact.Forename = inputContact.Forename;
    contact.DateOfBirth = inputContact.DateOfBirth;
    contact.Street = inputContact.Street;
    contact.HouseNumber = inputContact.HouseNumber;
    contact.District = inputContact.District;
    contact.City = inputContact.City;
    contact.PostCode = inputContact.PostCode;
    contact.Country = inputContact.Country;
    contact.TelephoneNumber = inputContact.TelephoneNumber;
    contact.Iban = inputContact.Iban;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/contactitems/{id}", async (int id, ContactDb db) =>
{
    if (await db.Contacts.FindAsync(id) is Contact contact)
    {
        db.Contacts.Remove(contact);
        await db.SaveChangesAsync();
        return Results.Ok(contact);
    }

    return Results.NotFound();
});

app.Run();

class Contact
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Surname { get; set; }
    public string? Forename { get; set; }
    public string? DateOfBirth { get; set; }
    public string? Street { get; set; }
    public string? HouseNumber { get; set; }
    public string? District { get; set; }
    public string? City { get; set; }
    public string? PostCode { get; set; }
    public string? Country { get; set; }
    public string? TelephoneNumber { get; set; }
    public string? Iban { get; set; }
}

class ContactDb : DbContext
{
    public ContactDb(DbContextOptions<ContactDb> options)
        : base(options) { }

    public DbSet<Contact> Contacts => Set<Contact>();
}