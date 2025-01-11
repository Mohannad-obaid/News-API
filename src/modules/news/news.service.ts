import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schema/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async create(newsData: CreateNewsDto): Promise<News> {
    const news = await this.newsModel.create(newsData);
    return news.save();
  }

  async findAll(): Promise<News[]> {
    return this.newsModel
      .find()
      .populate({ path: 'category', select: '_id name' })
      .populate({ path: 'author', select: '_id name' })
      .exec();
  }

  async findOne(id: string): Promise<News> {
    return this.newsModel
      .findById(id)
      .populate({ path: 'category', select: '_id name' })
      .populate({ path: 'author', select: '_id name' })
      .exec();
  }

  async update(id: string, updateData: any): Promise<News> {
    const news = await this.newsModel.findById(id);
    if (!news) {
      throw new NotFoundException(`News with id ${id} not found`);
    }
    return this.newsModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string): Promise<void> {
    const news = await this.newsModel.findById(id);
    if (!news) {
      throw new NotFoundException(`News with id ${id} not found`);
    }
    await this.newsModel.findByIdAndDelete(id);
  }

  async getNewsByCategory(id: string) {
    const news = await this.newsModel.find({ category: id }).exec();
    if (!news) {
      throw new NotFoundException(`News with category id ${id} not found`);
    }
    return news;
  }
}
