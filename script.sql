create database artAuction;
use artAuction;

create table User(
    userID int not null AUTO_INCREMENT,
    name varchar(30) not null,
    email varchar(40) not null unique,
    password varchar(40) not null,
    role varchar(30),
    PRIMARY KEY (userID)
);

create table Notification (
    notificationID int NOT NULL AUTO_INCREMENT,
    message VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    sender int NOT NULL,
    receiver int NOT NULL,
    PRIMARY KEY (notificationID),
    FOREIGN KEY (sender) REFERENCES User(userID),
    FOREIGN KEY (receiver) REFERENCES User(userID) ON DELETE CASCADE
);

create table Admin(
    userID int not null,
    specialization varchar(30) not null,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE ON UPDATE CASCADE 
);

create table ArtUser(
    userID int not null,
    tokens int check (tokens >= 0) not null,
    bio varchar(50) not null,
    country varchar(20) not null,
    highlighter_adminID int DEFAULT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (userID)
);

create table Artist(
    userID int not null,
    art_specialization varchar(50) not null,
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (userID)
);

create table Collector(
    userID int not null,
    art_tag varchar(50) not null,
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (userID)
);

create table Follows(
    followerID int not null,
    followedID int not null,
    FOREIGN KEY (followerID) REFERENCES ArtUser(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (followedID) REFERENCES ArtUser(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (followerID, followedID)
);

create table Collection(
    collectionID int not null auto_increment,
    collection_name varchar(50) not null,
    creator_collectorID int not null,
    FOREIGN KEY (creator_collectorID) REFERENCES Collector(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (collectionID)
);

create table Bid(
    bidID int not null auto_increment,
    bidAmount int not null,
    bid_status varchar(20) DEFAULT 'leading',
    date DATE not null,
    approver_admin_ID int DEFAULT NULL,
    approver_artist_ID int DEFAULT NULL,
    FOREIGN KEY (approver_admin_ID) REFERENCES Admin(userID),
    FOREIGN KEY (approver_artist_ID) REFERENCES Artist(userID),
    PRIMARY KEY (bidID)
);

create table Auction(
    auctionID int NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    auction_status varchar(10) DEFAULT 'proposed',
    uploaded_by_artist_ID int NOT NULL,
    type varchar(20) NOT NULL,
    size varchar(20) NOT NULL,
    creationDate DATE NOT NULL,
    uploadDate DATE NOT NULL, 
    startDate DATE DEFAULT '2000-01-01',
    description varchar(150) NOT NULL,
    endDate DATE NOT NULL,
    isEnded boolean DEFAULT FALSE,
    minimumBidIncrease int NOT NULL,
    baseBid int NOT NULL,
    verifier_admin_ID int DEFAULT NULL,
    highlighter_admin_ID int DEFAULT NULL,
    FOREIGN KEY (uploaded_by_artist_ID) REFERENCES Artist(userID),
    FOREIGN KEY (verifier_admin_ID) REFERENCES Admin(userID),
    FOREIGN KEY (highlighter_admin_ID) REFERENCES Admin(userID),
    PRIMARY KEY (auctionID)
);

create table Save(
    collectorID int not null,
    auctionID int not null,
    FOREIGN KEY (collectorID) REFERENCES Collector(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auctionID) REFERENCES Auction (auctionID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (collectorID, auctionID)
);

create table Offer (
    auctionID INT NOT NULL,
    bidID INT NOT NULL,
    collectorID INT, -- nullable
    FOREIGN KEY (auctionID) REFERENCES Auction (auctionID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (bidID) REFERENCES Bid(bidID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (collectorID) REFERENCES Collector(userID) ON DELETE SET NULL,
    PRIMARY KEY (auctionID, bidID)
);

create table Exhibition(
    exhibitionID int not null auto_increment,
    creatorAdminID int not null,
    exhibitionName varchar(200) not null,
    exhibitionDescriptor varchar(600),
    FOREIGN KEY (creatorAdminID) REFERENCES Admin(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (exhibitionID)
);

create table Curate(
    exhibitionID int not null,
    auctionID int not null,
    FOREIGN KEY (exhibitionID) REFERENCES Exhibition(exhibitionID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auctionID) REFERENCES Auction(auctionID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (exhibitionID, auctionID)
);

create table Collect(
    collectionID int not null,
    auctionID int not null,
    FOREIGN KEY (collectionID) REFERENCES Collection(collectionID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (auctionID) REFERENCES Auction(auctionID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (collectionID, auctionID)
);

-- Inserting Users
INSERT INTO User (name, email, password, role) VALUES ('Admin1', 'admin1@hotmail.com', '1234', 'admin');
INSERT INTO User (name, email, password, role) VALUES ('Artist1', 'artist1@hotmail.com', '1234', 'artist');
INSERT INTO User (name, email, password, role) VALUES ('Artist2', 'artist2@hotmail.com', '1234', 'artist'); 
INSERT INTO User (name, email, password, role) VALUES ('Artist3', 'artist3@hotmail.com', '1234', 'artist'); 
INSERT INTO User (name, email, password, role) VALUES ('Collector1', 'collector1@hotmail.com', '1234', 'collector'); 
INSERT INTO User (name, email, password, role) VALUES ('Collector2', 'collector2@hotmail.com', '1234', 'collector'); 
INSERT INTO User (name, email, password, role) VALUES ('Collector3', 'collector3@hotmail.com', '1234', 'collector');


-- Inserting Admin
INSERT INTO Admin (userID, specialization) VALUES (1, 'admin');

-- Inserting ArtUser
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (2, 1000, 'Passionate artist', 'USA', null);
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (3, 1500, 'Art enthusiast', 'Canada', null);
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (4, 2500, 'Passionate artist', 'Turkey', null);
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (5, 3500, 'Art enthusiast', 'Russia', null);
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (6, 4500, 'Passionate collector', 'France', null);
INSERT INTO ArtUser (userID, tokens, bio, country, highlighter_adminID) VALUES (7, 5500, 'Art enthusiast', 'Spain', null);

-- Inserting Artist
INSERT INTO Artist (userID, art_specialization) VALUES (2, 'Renaissance Art');
INSERT INTO Artist (userID, art_specialization) VALUES (3, 'Classical Art');
INSERT INTO Artist (userID, art_specialization) VALUES (4, 'Contemporary Art');

-- Inserting Collector
INSERT INTO Collector (userID, art_tag) VALUES (5, 'Renaissance Art');
INSERT INTO Collector (userID, art_tag) VALUES (6, 'Classical Art');
INSERT INTO Collector (userID, art_tag) VALUES (7, 'Contemporary Art');

-- Inserting Follows
INSERT INTO Follows (followerID, followedID) VALUES (3, 2);
INSERT INTO Follows (followerID, followedID) VALUES (2, 3);
INSERT INTO Follows (followerID, followedID) VALUES (3, 4);
INSERT INTO Follows (followerID, followedID) VALUES (4, 5);


-- Inserting Collection
INSERT INTO Collection (collection_name, creator_collectorID) VALUES ('Renaissance Collection', 5);
INSERT INTO Collection (collection_name, creator_collectorID) VALUES ('Contemporary Collection', 5);
INSERT INTO Collection (collection_name, creator_collectorID) VALUES ('Classical Collection', 7);

-- Inserting Bid
INSERT INTO Bid (bidAmount, date) VALUES (500, '2023-12-15');
INSERT INTO Bid (bidAmount, date) VALUES (600, '2023-12-15');
INSERT INTO Bid (bidAmount, date) VALUES (700, '2023-12-15');
INSERT INTO Bid (bidAmount, date) VALUES (800, '2023-12-15');
INSERT INTO Bid (bidAmount, date) VALUES (900, '2023-12-15');
INSERT INTO Bid (bidAmount, date) VALUES (1000, '2023-12-15');

 
-- Inserting Auction
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Abstract Artwork', 2, '120x120', 'Medium', '2003-12-01', '2023-01-10', 'A beautiful abstract painting.', '2023-12-21', 50, 200);
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Classical Artwork', 3, '200x500', 'Medium', '2005-12-01', '2023-01-10', 'A beautiful classical painting.', '2023-12-21', 50, 400);
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Contemporary Artwork', 4, '200x100', 'Medium', '2004-12-01', '2023-01-10', 'A beautiful contemporary painting.', '2025-12-21', 1000, 1000);
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Contemporary Artwork', 2, '200x100', 'Medium', '2006-12-01', '2023-01-10', 'A beautiful contemporary painting.', '2026-12-21', 1000, 1000);
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Contemporary Artwork', 3, '200x100', 'Medium', '2008-12-01', '2023-01-10', 'A beautiful contemporary painting.', '2025-12-11', 1000, 1000);
INSERT INTO Auction (title, uploaded_by_artist_ID, type, size, creationDate, uploadDate, description, endDate, minimumBidIncrease, baseBid) VALUES ('Contemporary Artwork', 4, '200x100', 'Medium', '2002-12-01', '2023-01-10', 'A beautiful contemporary painting.', '2024-12-21', 1000, 1000);

-- Inserting Save
INSERT INTO Save (collectorID, auctionID) VALUES (5, 1);

-- Inserting Offer
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (1, 1, 5);
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (2, 2, 6);
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (3, 3, 7);
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (4, 4, 7);
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (5, 5, 6);
INSERT INTO Offer (auctionID, bidID, collectorID) VALUES (6, 6, 5);

-- Inserting Exhibition
INSERT INTO Exhibition (creatorAdminID, exhibitionName, exhibitionDescriptor) VALUES (1, 'Turkish Republics Centenary Celebration', 'Each masterpiece in this exhibition captures the essence of this historic milestone, reflecting the rich heritage and progress of the Turkish Republic. Join us in celebrating this momentous occasion and bidding on these remarkable artworks that encapsulate the spirit of a nation');

-- Inserting Curate
INSERT INTO Curate (exhibitionID, auctionID) VALUES (1, 1);
INSERT INTO Curate (exhibitionID, auctionID) VALUES (1, 2);
INSERT INTO Curate (exhibitionID, auctionID) VALUES (1, 3);

-- Inserting Collect
INSERT INTO Collect (collectionID, auctionID) VALUES (1, 1);
