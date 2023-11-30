import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UnauthorizedException } from '@nestjs/common';

// JwtService를 모킹합니다.
jest.mock('@nestjs/jwt');

describe('MemberController', () => {
  let memberController: MemberController;
  let memberService: MemberService;

  beforeEach(async () => {
    // NestJS 테스트 모듈을 이용하여 컨트롤러, 서비스, JwtService를 초기화합니다.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    // 각각의 컴포넌트를 가져옵니다.
    memberController = module.get<MemberController>(MemberController);
    memberService = module.get<MemberService>(MemberService);
  });

  describe('getUserData', () => {
    it('성공 시 사용자 데이터를 반환해야 함', async () => {
      // memberService.getUserData 메서드를 모킹하여 성공적인 응답을 설정합니다.
      const mockUserData = {
        providerId: '11111122222222',
        email: 'morak@gmail.com',
        nickname: 'morak morak',
        profilePicture: 'morak.jpg',
      };

      jest.spyOn(memberService, 'getUserData').mockResolvedValue(mockUserData);

      // Express의 Request와 Response 객체를 모킹합니다.
      const mockRequest = {
        cookies: { access_token: 'mockAccessToken' },
      } as any; // Express Request를 모킹합니다.
      const mockResponse = {
        json: jest.fn(),
      } as any; // Express Response를 모킹합니다.

      // memberController.getUserData를 호출하고 반환값이 예상된 값인지 확인합니다.
      await memberController.getUserData(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockUserData);
    });

    it('실패 시 UnauthorizedException을 던져야 함', async () => {
      // memberService.getUserData 메서드가 에러를 던지도록 모킹합니다.
      jest.spyOn(memberService, 'getUserData').mockRejectedValue(new UnauthorizedException('Unauthorized'));

      // Express의 Request와 Response 객체를 모킹합니다.
      const mockRequest = {
        cookies: { access_token: 'mockAccessToken' },
      } as any; // Express Request를 모킹합니다.
      const mockResponse = {
        json: jest.fn(),
      } as any; // Express Response를 모킹합니다.

      // 예외를 테스트하기 위해 async/await 및 try/catch를 사용합니다.
      try {
        await memberController.getUserData(mockRequest, mockResponse);
      } catch (error) {
        // 던져진 에러가 UnauthorizedException의 인스턴스인지 확인합니다.
        expect(error).toBeInstanceOf(UnauthorizedException);
        // 에러 메시지나 다른 세부 정보를 필요에 따라 확인합니다.
      }
    });
  });
});