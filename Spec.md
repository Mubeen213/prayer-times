# Requirements Specification

1. User Roles
   Super Admin
   Can create, update, and delete admin users.
   Can create, update, and delete mosque records.
   Can update prayer timings for any mosque.
   Admin
   Can update prayer timings for the mosque they are mapped to.
   End User
   Can search for mosques by name or location.
   Can view prayer timings for mosques.
2. Authentication and Authorization
   Login Page
   Only accessible to Super Admin and Admin users.
   Requires username and password for access.
   Access Control
   Super Admin has access to all functionalities.
   Admin has access only to functionalities related to their mapped mosque.
3. Mosque Management
   Mosque Information
   Name
   Location (Address, City, State, Country)
   Prayer Timings (Fajr, Dhuhr, Asr, Maghrib, Isha)
   CRUD Operations
   Super Admin can create, read, update, and delete mosque records.
4. Admin Management
   Admin Information
   Username
   Password
   Mapped Mosque
   CRUD Operations
   Super Admin can create, read, update, and delete admin users.
5. Search Functionality
   Search Criteria
   Mosque Name
   Location (City, State, Country)
   Search Results
   Display list of mosques matching the search criteria.
   Display prayer timings for each mosque in the search results.
