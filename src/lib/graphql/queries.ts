export const ME_QUERY = `
  query Me {
    me {
      id
      email
      fullName
      phone
      avatar
      role
      isActive
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

// ==================== Wedding Queries ====================

export const WEDDINGS_QUERY = `query Weddings {
    weddings {
        id
        userId
        slug
        title
        status
        language
        viewCount
        publishedAt
        createdAt
        updatedAt
        weddingDate
        weddingDetail {
            id
            weddingId
            bride {
                fullName
                avatar
                shortBio
                familyInfo
                socialLinks
            }
            groom {
                fullName
                avatar
                shortBio
                familyInfo
                socialLinks
            }
        }
        themeSettings {
            primaryColor
            secondaryColor
            fontHeading
            fontBody
            backgroundMusic
        }
    }
}
`;

export const WEDDING_QUERY = `
  query Wedding($id: ID!) {
    wedding(id: $id) {
      id
      userId
      slug
      title
      status
      language
      themeSettings {
        primaryColor
        secondaryColor
        fontHeading
        fontBody
        backgroundMusic
      }
      viewCount
      publishedAt
      createdAt
      updatedAt
      weddingDetail {
        id
        weddingId
        bride {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        groom {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        loveStories {
          id
          title
          content
          storyDate
          imageUrl
        }
        weddingEvents {
          id
          title
          type
          eventDate
          startTime
          endTime
          address
          locationLat
          locationLng
          mapEmbedUrl
          description
        }
      }
    }
  }
`;

export const WEDDING_BY_SLUG_QUERY = `
  query WeddingBySlug($slug: String!) {
    weddingBySlug(slug: $slug) {
      id
      userId
      slug
      title
      status
      language
      themeSettings {
        primaryColor
        secondaryColor
        fontHeading
        fontBody
        backgroundMusic
      }
      viewCount
      publishedAt
      createdAt
      updatedAt
      weddingDetail {
        id
        weddingId
        bride {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        groom {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        loveStories {
          id
          title
          content
          storyDate
          imageUrl
        }
        weddingEvents {
          id
          title
          type
          eventDate
          startTime
          endTime
          address
          locationLat
          locationLng
          mapEmbedUrl
          description
        }
      }
    }
  }
`;

export const SEARCH_WEDDINGS_QUERY = `
  query SearchWeddings($query: String!) {
    searchWeddings(query: $query) {
      id
      userId
      slug
      title
      status
      language
      viewCount
      createdAt
      updatedAt
    }
  }
`;

export const WEDDING_DETAIL_QUERY = `
  query WeddingDetail($id: ID!) {
    wedding(id: $id) {
      id
      title
      slug
      status
      weddingDetail {
        id
        weddingId
        bride {
          fullName
        }
        groom {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        loveStories {
          id
          title
          content
          storyDate
          imageUrl
        }
        weddingEvents {
          id
          title
          type
          eventDate
          startTime
          endTime
          address
          locationLat
          locationLng
          mapEmbedUrl
          description
        }
      }
      themeSettings {
        primaryColor
        secondaryColor
        fontHeading
        fontBody
        backgroundMusic
      }
      viewCount
      publishedAt
      createdAt
      updatedAt
      weddingDate
      language
    }
  }
`;

export const PUBLIC_WEDDING_QUERY = `
  query PublicWedding($slug: String!) {
    publicWedding(slug: $slug) {
      id
      userId
      slug
      title
      status
      language
      themeSettings {
        primaryColor
        secondaryColor
        fontHeading
        fontBody
        backgroundMusic
      }
      viewCount
      publishedAt
      createdAt
      updatedAt
      weddingDetail {
        id
        weddingId
        bride {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        groom {
          fullName
          avatar
          shortBio
          familyInfo
          socialLinks
        }
        loveStories {
          id
          title
          content
          storyDate
          imageUrl
        }
        weddingEvents {
          id
          title
          type
          eventDate
          startTime
          endTime
          address
          locationLat
          locationLng
          mapEmbedUrl
          description
        }
      }
    }
  }
`;

// ==================== Guest Queries ====================

export const GUESTS_QUERY = `
  query Guests($weddingId: ID!) {
    guests(weddingId: $weddingId) {
      id
      weddingId
      fullName
      email
      phone
      relationship
      numberOfGuests
      attendanceStatus
      dietaryRestrictions
      message
      respondedAt
      tableNumber
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GUEST_STATS_QUERY = `
  query GuestStats($weddingId: ID!) {
    guestStats(weddingId: $weddingId) {
      total
      confirmed
      pending
      declined
      totalGuests
    }
  }
`;
