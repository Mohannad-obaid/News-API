import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad } from './schema/categories.schema';
import { CreateAdDto } from './dto/create-ads.dto';
import { UpdateAdDto } from './dto/update-category.dto';

@Injectable()
export class AdService {
  constructor(@InjectModel(Ad.name) private readonly adModel: Model<Ad>) {}

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const newAd = new this.adModel(createAdDto);
    await newAd.save();
    if (!newAd) {
      throw new NotFoundException(`Ad not created`);
    }

    return newAd;
  }

  async findAll(): Promise<Ad[]> {
    return this.adModel.find();
  }

  async findOne(id: string): Promise<Ad> {
    const ad = await this.adModel.findById(id);
    if (!ad) {
      throw new NotFoundException(`Ad with ID "${id}" not found`);
    }
    return ad;
  }

  async update(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
    const updatedAd = await this.adModel
      .findByIdAndUpdate(id, updateAdDto, { new: true })
      .exec();
    if (!updatedAd) {
      throw new NotFoundException(`Ad with ID "${id}" not found`);
    }
    return updatedAd;
  }

  async remove(id: string): Promise<void> {
    const result = await this.adModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Ad with ID "${id}" not found`);
    }
  }
}
