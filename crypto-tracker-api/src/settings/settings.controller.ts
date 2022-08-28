import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateThemeSettingDto } from './dto/update-theme.dto';
import { UpdateUiScaleDto } from './dto/update-ui-scale.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Patch('theme')
  updateTheme(@Body() updateThemeSettingsDto: UpdateThemeSettingDto) {
    return this.settingsService.updateTheme(updateThemeSettingsDto);
  }

  @Patch('ui-scale')
  updateUiScale(@Body() updateUiScaleDto: UpdateUiScaleDto) {
    return this.settingsService.updateUiScale(updateUiScaleDto);
  }

  
}
