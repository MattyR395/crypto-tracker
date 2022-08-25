import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return {
      fiatCurrencySymbol: 'GBP',
      themeId: 0,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return 1;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
