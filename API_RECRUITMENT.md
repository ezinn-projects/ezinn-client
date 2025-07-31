# API Recruitment Documentation

## Endpoint: `/api/recruitment`

### POST - Submit Application

**URL:** `POST /api/recruitment`

**Description:** Gửi đơn ứng tuyển mới

#### Request Body

```json
{
  "fullName": "Nguyễn Văn A",
  "birthDate": "2004-01-15T00:00:00.000Z",
  "gender": "male",
  "phone": "0912345678",
  "email": "example@email.com",
  "socialMedia": "https://facebook.com/example",
  "currentStatus": "student",
  "otherStatus": "",
  "position": "cashier"
}
```

#### Field Descriptions

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `fullName` | string | ✅ | Họ tên đầy đủ | Min 2 ký tự |
| `birthDate` | Date | ✅ | Ngày sinh | 18-25 tuổi |
| `gender` | string | ✅ | Giới tính | "male", "female", "other" |
| `phone` | string | ✅ | Số điện thoại | Format VN: 0xxxxxxxxx |
| `email` | string | ❌ | Email | Email hợp lệ (optional) |
| `socialMedia` | string | ✅ | Facebook/Zalo | Không được rỗng |
| `currentStatus` | string | ✅ | Tình trạng hiện tại | "student", "working", "other" |
| `otherStatus` | string | ❌ | Tình trạng khác | Required nếu currentStatus = "other" |

| `position` | string | ✅ | Vị trí ứng tuyển | "cashier", "server" |

#### Response

**Success (201):**
```json
{
  "success": true,
  "message": "Đơn ứng tuyển đã được gửi thành công!",
  "applicationId": "507f1f77bcf86cd799439011"
}
```

**Error (400):**
```json
{
  "error": "Dữ liệu không hợp lệ",
  "details": [
    {
      "code": "invalid_string",
      "minimum": 2,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "Họ tên phải có ít nhất 2 ký tự",
      "path": ["fullName"]
    }
  ]
}
```

**Error (500):**
```json
{
  "error": "Có lỗi xảy ra khi gửi đơn ứng tuyển"
}
```

### GET - Get Applications (Admin)

**URL:** `GET /api/recruitment`

**Description:** Lấy danh sách đơn ứng tuyển (cho admin)

#### Response

**Success (200):**
```json
{
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "Nguyễn Văn A",
      "birthDate": "2004-01-15T00:00:00.000Z",
      "gender": "male",
      "phone": "0912345678",
      "email": "example@email.com",
      "socialMedia": "https://facebook.com/example",
      "currentStatus": "student",
      "otherStatus": "",

      "position": "cashier",
      "submittedAt": "2024-01-15T10:30:00.000Z",
      "status": "pending"
    }
  ]
}
```

## Database Schema

### Collection: `recruitments`

```javascript
{
  _id: ObjectId,
  fullName: String,
  birthDate: Date,
  gender: String,
  phone: String,
  email: String,
  socialMedia: String,
  currentStatus: String,
  otherStatus: String,

  position: String,
  submittedAt: Date,
  status: String // "pending", "reviewed", "contacted", "hired", "rejected"
}
```

## Status Values

- `pending`: Chờ xem xét
- `reviewed`: Đã xem xét
- `contacted`: Đã liên hệ
- `hired`: Đã tuyển dụng
- `rejected`: Từ chối

## Example Usage

### JavaScript/TypeScript

```javascript
const submitApplication = async (formData) => {
  try {
    const response = await fetch('/api/recruitment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};
```

### cURL

```bash
curl -X POST http://localhost:3000/api/recruitment \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyễn Văn A",
    "birthDate": "2004-01-15T00:00:00.000Z",
    "gender": "male",
    "phone": "0912345678",
    "email": "example@email.com",
    "socialMedia": "https://facebook.com/example",
    "currentStatus": "student",
    "otherStatus": "",
    "workDays": ["monday", "tuesday", "wednesday", "thursday"],
    "position": "cashier"
  }'
``` 