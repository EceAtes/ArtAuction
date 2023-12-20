--ArtistView
CREATE VIEW ArtistView AS
SELECT
    A.userID AS artistID,
    U.name AS artistName,
    U.email AS artistEmail,
    U.role AS artistRole,
    A.art_specialization AS artistSpecialization
FROM
    Artist A
        JOIN
    User U ON A.userID = U.userID;

--AdminView
CREATE VIEW AdminView AS
SELECT
    A.userID AS adminID,
    U.name AS adminName,
    U.email AS adminEmail,
    U.role AS adminRole,
    A.specialization AS adminSpecialization
FROM
    Admin A
        JOIN
    User U ON A.userID = U.userID;

--CollectorView
CREATE VIEW CollectorView AS
SELECT
    C.userID AS collectorID,
    U.name AS collectorName,
    U.email AS collectorEmail,
    U.role AS collectorRole,
    C.art_tag AS collectorArtTag
FROM
    Collector C
        JOIN
    User U ON C.userID = U.userID;