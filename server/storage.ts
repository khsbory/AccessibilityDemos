import { users, type User, type InsertUser, type Notification, type InsertNotification } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // 알림 관련 메서드
  getNotifications(): Promise<Notification[]>;
  getNotification(id: number): Promise<Notification | undefined>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  deleteNotification(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private notifications: Map<number, Notification>;
  currentUserId: number;
  currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentNotificationId = 1;
    
    // 샘플 알림 데이터 초기화
    this.initSampleNotifications();
  }

  // 샘플 알림 데이터 생성
  private initSampleNotifications() {
    const sampleNotifications: InsertNotification[] = [
      {
        title: "주문 확인",
        message: "[Apple iPhone 15 Pro] 주문이 정상적으로 접수되었습니다. 주문번호: #20241209001",
        type: "order",
        isRead: false
      },
      {
        title: "결제 완료",
        message: "[무선 이어폰 AirPods Pro] 결제가 완료되었습니다. 곧 배송 준비에 들어갑니다.",
        type: "order",
        isRead: false
      },
      {
        title: "상품 준비중",
        message: "[프리미엄 백팩] 주문하신 상품을 포장하고 있습니다. 영업일 기준 1-2일 내 발송 예정입니다.",
        type: "delivery",
        isRead: false
      },
      {
        title: "배송 시작",
        message: "[스마트워치 Galaxy Watch] 상품이 출발했습니다! 운송장번호: 1588-1234-5678",
        type: "delivery",
        isRead: false
      },
      {
        title: "배송 중",
        message: "[노트북 MacBook Air] 현재 배송 중입니다. 오늘 오후 6시경 도착 예정입니다.",
        type: "delivery",
        isRead: false
      },
      {
        title: "배송 완료",
        message: "[운동화 Nike Air Max] 배송이 완료되었습니다. 상품을 확인해 주세요!",
        type: "delivery",
        isRead: true
      },
      {
        title: "리뷰 요청",
        message: "[블루투스 스피커] 상품은 어떠셨나요? 리뷰를 남겨주시면 적립금을 드립니다.",
        type: "system",
        isRead: false
      },
      {
        title: "할인 쿠폰 도착",
        message: "🎉 특별 할인 쿠폰이 도착했습니다! 전 상품 20% 할인, 12월 15일까지 사용 가능합니다.",
        type: "promotion",
        isRead: false
      },
      {
        title: "재입고 알림",
        message: "[한정판 게이밍 키보드] 관심 상품이 재입고되었습니다. 놓치지 마세요!",
        type: "system",
        isRead: false
      },
      {
        title: "배송 지연 안내",
        message: "[프리미엄 코트] 날씨로 인해 배송이 1일 지연됩니다. 양해 부탁드립니다.",
        type: "delivery",
        isRead: false
      }
    ];

    sampleNotifications.forEach(notification => {
      this.createNotification(notification);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // 알림 관련 메서드 구현
  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = {
      ...insertNotification,
      id,
      isRead: insertNotification.isRead ?? false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async deleteNotification(id: number): Promise<boolean> {
    return this.notifications.delete(id);
  }
}

export const storage = new MemStorage();
