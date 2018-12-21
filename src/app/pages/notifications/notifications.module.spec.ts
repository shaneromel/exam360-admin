import { NotificationsModule } from './notifications.module';

describe('NotificationsModule', () => {
  let notificationsModule: NotificationsModule;

  beforeEach(() => {
    notificationsModule = new NotificationsModule();
  });

  it('should create an instance', () => {
    expect(notificationsModule).toBeTruthy();
  });
});
