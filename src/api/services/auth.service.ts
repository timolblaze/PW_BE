import userService from "./user.service"
import GenericService from "./generic.service";
import {
  NotFoundException,
  ForbiddenException,
  UnAuthorizedException,
  InternalException,
} from "./error.service";
import { IUser, ICreateUser, ILogin } from "@interfaces";
import { generateToken, verifyHash, logger } from "@utils";
import { JWT_EXPIRES_IN } from '@configs';

export class AuthService {
  private userService: GenericService<IUser>;
  
  constructor(userService: GenericService<IUser>) {
    this.userService = userService;
  }

  async register(payload: ICreateUser) {
    const { email } = payload;

    // const isExistingUser = await this.userService.findOne({ email })

    // if (isExistingUser) {
    //   throw new ForbiddenException("Email not available.");
    // }
    
    const user = await this.userService.create(payload)

    if (!user) {
      throw new InternalException()
    }

    const accessToken = await generateToken(
      { _id: user._id },
      JWT_EXPIRES_IN
    );

    logger.info({ createdUser: user });

    await user.save()

    return { user: user.toJSON(), accessToken };
  }

  async login(payload: ILogin) {
    const { email, password } = payload;
    const isExistingUser = await this.userService.findOne({ email })

    if (!isExistingUser) {
      throw new NotFoundException("User Not Found");
    }
    
    console.log(234, email, password, isExistingUser.password, isExistingUser);
    const isValidPassword = await verifyHash(password, isExistingUser.password);
    if (!isValidPassword) {
      throw new UnAuthorizedException("Invalid email or password");
    }

    const user = isExistingUser.toJSON()

    const accessToken = await generateToken(
      { _id: user._id },
      JWT_EXPIRES_IN
    );

    logger.info({ loggedInUser: user });

    return { user, accessToken };
  }
}

export default new AuthService(userService);