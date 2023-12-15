create table User(
    userID int not null AUTO_INCREMENT,
    name varchar(30) not null,
    email varchar(40) not null,
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
    tokens int not null,
    bio varchar(50) not null,
    country varchar(20) not null,
    highlighter_adminID boolean DEFAULT FALSE,
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
    auctionID int not null auto_increment,
    title varchar(50) not null,
    auction_status varchar(10) DEFAULT 'proposed',
    uploaded_by_artist_ID int not null,
    type varchar(20) not null,
    size varchar(20) not null,
    creationDate DATE not null,
    uploadDate DATE not null, 
    startDate DATE DEFAULT NULL,
    description varchar(150) not null,
    endDate DATE not null,
    isEnded boolean DEFAULT FALSE,
    minimumBidIncrease int not null,
    baseBid int not null,
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
    exhibitionName varchar(50) not null,
    exhibitionDescriptor varchar(50),
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