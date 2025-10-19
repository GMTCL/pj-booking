# PrettyQueue Studio - Next.js App

เว็บแอปพลิเคชันสำหรับสตูดิโอทำเล็บ PrettyQueue Studio ที่พัฒนาด้วย Next.js, TypeScript, และ Tailwind CSS

##  Features

-  **Modern UI/UX**: ออกแบบด้วย Tailwind CSS และ FontAwesome icons
-  **Responsive Design**: รองรับการใช้งานใน Line
-  **Notification System**: ระบบแจ้งเตือนแบบ real-time
-  **Service Selection**: เลือกบริการทำเล็บและต่อขนตา
-  **Booking System**: ระบบจองคิวแบบ step-by-step
-  **Fast Performance**: ใช้ Next.js App Router และ Server Components

##  Getting Started

### Prerequisites

- Node.js 18+ 
- npm หรือ yarn

### Installation

1. Clone repository:
```bash
git clone <repository-url>
cd pretty-queue-studio
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # หน้าแรก (Home)
│   ├── services/          # หน้าเลือกบริการ
│   ├── booking/           # หน้าจองคิว
│   ├── nail-packages/     # หน้าแพ็กเกจเล็บ
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Notification.tsx   # Notification component
│   └── NotificationContainer.tsx
├── hooks/                 # Custom React hooks
│   └── useNotification.ts # Notification hook
└── public/               # Static assets
    └── images/           # รูปภาพต่างๆ
```

##  Pages

### 1. Home Page (`/`)
- หน้าแรกแสดงบริการหลัก
- เลือกบริการทำเล็บหรือต่อขนตา
- Logo และ branding ของสตูดิโอ

### 2. Services Page (`/services`)
- แสดงรายการบริการทั้งหมด
- ราคาและรายละเอียดบริการ
- เลือกบริการเพื่อไปหน้าจองคิว

### 3. Booking Page (`/booking`)
- ระบบจองคิวแบบ step-by-step
- เลือกช่าง, เวลา, และวันที่
- Progress indicator

### 4. Nail Packages Page (`/nail-packages`)
- หน้าแสดงแพ็กเกจเล็บพิเศษ
- Background image แบบเต็มหน้าจอ

##  Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **FontAwesome** - Icons
- **React Hooks** - State management

##  Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for mobile devices

##  Custom Hooks

### useNotification
```typescript
const { notifications, showNotification, removeNotification } = useNotification();

// Show notification
showNotification('ข้อความ', 'success', 3000);

// Remove notification
removeNotification(notificationId);
```

##  Key Features

### Notification System
- Real-time notifications
- Multiple types: success, error, warning, info
- Auto-dismiss after 3 seconds
- Manual dismiss option

### Service Selection
- Interactive service cards
- Visual feedback on selection
- Navigation to booking page

### Booking Flow
- Step-by-step process
- Form validation
- Progress tracking
- Date/time selection

##  Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```
