import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { readdir, createWriteStream } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import jwt_decode from "jwt-decode";
import { chooseRandomElementsFromList } from 'src/utils/random-choice';
import { UserService } from 'src/users/users.service';

const promisedReaddir = promisify(readdir);

const blackboxPath = join(__dirname, '../../public/images/blackbox');


@Injectable()
export class BlackboxService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async addPicture(pictureData, context): Promise<boolean> {
    return await new Promise(async (resolve, reject) => {
      const token = context.req.headers.authorization.slice(6);

      try {
        var { userId }: any = jwt_decode(token);
        var user = await this.userService.findOne({ _id: userId });

        if (user.blackbox.is_used) {
          throw new HttpException('The picture has already been added by this user', 409);
        }

      } catch (e) {
        return reject(e);
      }

      const fileNames = await promisedReaddir(blackboxPath);

      let newImgName = pictureData.filename;
      let postfix = 0;
      
      while(fileNames.includes(newImgName)) {
        newImgName = pictureData.filename.replace(/\.[^.]+$/, `${postfix++}$&`)
      }

      return pictureData.createReadStream()
          .pipe(createWriteStream(`${blackboxPath}/${newImgName}`))
          .on('finish', () => {
            const update = { blackbox: {...user.blackbox, is_used: true, added_picture: newImgName}};
            this.userService.update({_id: userId}, update)

            return resolve(true)
          })
          .on('error', () => reject(false))
      }
    );
  }
  async givePictures(number: number, context) {
    return await new Promise(async (resolve, reject) => {
      const token = context.req.headers.authorization.slice(6);

      try {
        var { userId }: any = jwt_decode(token); 
        var user = await this.userService.findOne({ _id: userId });

        if (user.blackbox.pictures.length) {
          return resolve({
            images_paths: user.blackbox.pictures
          })
        }

      } catch (e) {
        return reject(false)
      }

      return await readdir(blackboxPath, async (err, files) => {
        if (!err) {
          files = files.filter(name => name !== user.blackbox.added_picture);

          const amountAvailableImgs = Math.min(number, files.length)
          const randomImgs = chooseRandomElementsFromList(files, amountAvailableImgs) as Array<string>

          const update: unknown = { blackbox: {...user.blackbox, pictures: randomImgs}};
          await this.userService.update({_id: userId}, update)

          return resolve({
            images_paths: randomImgs
          })
        } else {
          return reject(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    });


  }
}