package com.example.artauction.POJO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.io.Serializable;
import java.sql.Date;

@NamedQuery(name = "Auction.getAllAuctions", query = "select new com.example.artauction.wrapper.AuctionWrapper(a.auctionID,a.title, a.auction_status) from Auction a") //also get number of bids (for ordering)
@Data //default constructor & getter and setters
@Entity
@DynamicUpdate
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "auction")
public class Auction implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auctionID")
    private Integer auctionID;

    @Column(name = "title")
    private String title;

    @Column(name = "auction_status")
    private String auction_status = "Proposed";

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private String size;

    @Column(name = "creationDate")
    private Date creationDate; //art pieces' creation date

    @Column(name = "uploadDate")
    private Date uploadDate = new Date(System.currentTimeMillis());//art pieces' upload date to the website

    @Column(name = "startDate")
    private Date startDate = null;//art pieces' auctions' start date

    @Column(name = "endDate")
    private Date endDate;//art pieces' auctions' end date

    @Column(name = "isEnded")
    private boolean isEnded = false;

    @Column(name = "description")
    private String description;

    @Column(name = "minBidIncrease")
    private int minBidIncrease;

    @Column(name = "baseBid")
    private int baseBid;

    @ManyToOne
    private Artist uploaded_by_artist = null;

    @ManyToOne
    private Admin verifier_admin = null;

    @ManyToOne
    private Admin highlighter_admin = null;

    @Override
    public String toString() {
        return "Auction{" +
                "auctionID=" + auctionID +
                ", title='" + title + '\'' +
                ", auction_status='" + auction_status + '\'' +
                ", type='" + type + '\'' +
                ", size='" + size + '\'' +
                ", creationDate=" + creationDate +
                ", uploadDate=" + uploadDate +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", isEnded=" + isEnded +
                ", description='" + description + '\'' +
                ", minBidIncrease=" + minBidIncrease +
                ", baseBid=" + baseBid +
                '}';
    }
}
