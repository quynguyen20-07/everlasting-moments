// GraphQL Mutations - All mutation definitions matching schema exactly

// ==================== Auth Mutations ====================

export const REGISTER_MUTATION = `
  mutation Register($email: String!, $password: String!, $fullName: String!, $phone: String) {
    register(email: $email, password: $password, fullName: $fullName, phone: $phone) {
      user {
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
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
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
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      user {
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
      accessToken
      refreshToken
    }
  }
`;

// ==================== Wedding Mutations ====================

export const CREATE_WEDDING_MUTATION = `
  mutation CreateWedding($title: String!, $slug: String, $language: String) {
    createWedding(title: $title, slug: $slug, language: $language) {
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
    }
  }
`;

export const UPDATE_WEDDING_MUTATION = `
  mutation UpdateWedding($id: ID!, $title: String, $slug: String, $status: String) {
    updateWedding(id: $id, title: $title, slug: $slug, status: $status) {
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
    }
  }
`;

export const DELETE_WEDDING_MUTATION = `
  mutation DeleteWedding($id: ID!) {
    deleteWedding(id: $id) {
      id
      title
    }
  }
`;

export const PUBLISH_WEDDING_MUTATION = `
  mutation PublishWedding($id: ID!) {
    publishWedding(id: $id) {
      id
      status
      publishedAt
    }
  }
`;

export const UNPUBLISH_WEDDING_MUTATION = `
  mutation UnpublishWedding($id: ID!) {
    unpublishWedding(id: $id) {
      id
      status
      publishedAt
    }
  }
`;

// ==================== Bride & Groom Mutations ====================

export const UPDATE_BRIDE_MUTATION = `
  mutation UpdateBride($weddingId: ID!, $bride: BrideGroomInput!) {
    updateBride(weddingId: $weddingId, bride: $bride) {
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
  }
`;

export const UPDATE_GROOM_MUTATION = `
  mutation UpdateGroom($weddingId: ID!, $groom: BrideGroomInput!) {
    updateGroom(weddingId: $weddingId, groom: $groom) {
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
  }
`;

// ==================== Love Story Mutations ====================

export const ADD_LOVE_STORY_MUTATION = `
  mutation AddLoveStory($weddingId: ID!, $story: LoveStoryInput!) {
    addLoveStory(weddingId: $weddingId, story: $story) {
      id
      weddingId
      loveStories {
        id
        title
        content
        storyDate
        imageUrl
      }
    }
  }
`;

export const UPDATE_LOVE_STORY_MUTATION = `
  mutation UpdateLoveStory($weddingId: ID!, $storyId: ID!, $story: LoveStoryInput!) {
    updateLoveStory(weddingId: $weddingId, storyId: $storyId, story: $story) {
      id
      weddingId
      loveStories {
        id
        title
        content
        storyDate
        imageUrl
      }
    }
  }
`;

export const DELETE_LOVE_STORY_MUTATION = `
  mutation DeleteLoveStory($weddingId: ID!, $storyId: ID!) {
    deleteLoveStory(weddingId: $weddingId, storyId: $storyId) {
      id
      weddingId
      loveStories {
        id
        title
        content
        storyDate
        imageUrl
      }
    }
  }
`;

// ==================== Wedding Event Mutations ====================

export const ADD_WEDDING_EVENT_MUTATION = `
  mutation AddWeddingEvent($weddingId: ID!, $event: WeddingEventInput!) {
    addWeddingEvent(weddingId: $weddingId, event: $event) {
      id
      weddingId
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
`;

export const UPDATE_WEDDING_EVENT_MUTATION = `
  mutation UpdateWeddingEvent($weddingId: ID!, $eventId: ID!, $event: WeddingEventInput!) {
    updateWeddingEvent(weddingId: $weddingId, eventId: $eventId, event: $event) {
      id
      weddingId
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
`;

export const DELETE_WEDDING_EVENT_MUTATION = `
  mutation DeleteWeddingEvent($weddingId: ID!, $eventId: ID!) {
    deleteWeddingEvent(weddingId: $weddingId, eventId: $eventId) {
      id
      weddingId
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
`;

// ==================== Guest Mutations ====================

export const ADD_GUEST_MUTATION = `
  mutation AddGuest($weddingId: ID!, $guest: GuestInput!) {
    addGuest(weddingId: $weddingId, guest: $guest) {
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

export const UPDATE_GUEST_MUTATION = `
  mutation UpdateGuest($id: ID!, $guest: GuestInput!) {
    updateGuest(id: $id, guest: $guest) {
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

export const DELETE_GUEST_MUTATION = `
  mutation DeleteGuest($id: ID!) {
    deleteGuest(id: $id) {
      id
      fullName
    }
  }
`;

export const SUBMIT_RSVP_MUTATION = `
  mutation SubmitRSVP($weddingId: ID!, $rsvp: RSVPInput!) {
    submitRSVP(weddingId: $weddingId, rsvp: $rsvp) {
      id
      weddingId
      fullName
      email
      phone
      numberOfGuests
      attendanceStatus
      dietaryRestrictions
      message
      respondedAt
      createdAt
    }
  }
`;

// ==================== Bank Account Mutations ====================

export const ADD_BANK_ACCOUNT_MUTATION = `
  mutation AddBankAccount($weddingId: ID!, $bankAccount: BankAccountInput!) {
    addBankAccount(weddingId: $weddingId, bankAccount: $bankAccount) {
      id
      weddingId
      bankName
      accountNumber
      accountHolder
      branch
      qrCodeUrl
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BANK_ACCOUNT_MUTATION = `
  mutation UpdateBankAccount($id: ID!, $bankAccount: BankAccountInput!) {
    updateBankAccount(id: $id, bankAccount: $bankAccount) {
      id
      weddingId
      bankName
      accountNumber
      accountHolder
      branch
      qrCodeUrl
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BANK_ACCOUNT_MUTATION = `
  mutation DeleteBankAccount($id: ID!) {
    deleteBankAccount(id: $id) {
      id
      bankName
    }
  }
`;

// ==================== Wish Mutations ====================

export const ADD_WISH_MUTATION = `
  mutation AddWish($weddingId: ID!, $wish: WishInput!) {
    addWish(weddingId: $weddingId, wish: $wish) {
      id
      weddingId
      guestName
      message
      isApproved
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const APPROVE_WISH_MUTATION = `
  mutation ApproveWish($id: ID!) {
    approveWish(id: $id) {
      id
      isApproved
    }
  }
`;

export const DELETE_WISH_MUTATION = `
  mutation DeleteWish($id: ID!) {
    deleteWish(id: $id) {
      id
      guestName
    }
  }
`;
