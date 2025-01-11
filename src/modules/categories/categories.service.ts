import { Model } from 'mongoose';
import { Category } from './schema/categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryModel.create(category);
    await newCategory.save();
    if (!newCategory) {
      throw new Error('Category not created');
    }
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    const cat = await this.categoryModel.findById(id);

    if (!cat) {
      throw new NotFoundException('Category not found');
    }

    return cat;
  }

  async update(id: string, category: CreateCategoryDto): Promise<Category> {
    await this.findOne(id);

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      { _id: id },
      category,
      { new: true },
    );

    if (!updatedCategory) {
      throw new Error('Category not updated');
    }

    return updatedCategory;
  }

  async remove(id: string): Promise<void> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
