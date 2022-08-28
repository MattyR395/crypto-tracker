import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateThemeSettingDto } from './dto/update-theme.dto';
import { UpdateUiScaleDto } from './dto/update-ui-scale.dto';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(Setting) private settingsRepository: Repository<Setting>,
    @Inject(REQUEST) private readonly request: { user: { sub: string } }
  ) {}

  /**
   * Returns all settings for the user.
   * @returns Setting
   */
  findAll(): Promise<Setting> {
    return this.settingsRepository.findOne({
      select: ['themeId', 'fiatCurrency', 'language', 'uiScaleId'],
      where: { userId: this.request.user.sub }
    });
  }

  /**
   * Updates the theme setting for the user.
   * @param updateThemeSettingDto ID of the theme to update to.
   */
  updateTheme(updateThemeSettingDto: UpdateThemeSettingDto) {
    this.settingsRepository.save({
      userId: this.request.user.sub,
      themeId: updateThemeSettingDto.themeId,
    });
  }

  updateUiScale(updateUiScaleSettingDto: UpdateUiScaleDto) {
    this.settingsRepository.save({
      userId: this.request.user.sub,
      uiScaleId: updateUiScaleSettingDto.uiScaleId,
    });
  }
}
