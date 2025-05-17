import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorCardComponent} from '../../../../persons/authors/components/author-card/author-card.component';
import {Book} from '../../model/book.entity';
import {AuthorService} from '../../../../persons/authors/services/author.service.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, AuthorCardComponent],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book | null = null;
  author: any = null;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    if (this.book) {
      this.loadAuthor(this.book.autor_id);
    }
  }

  loadAuthor(authorId: string): void {
    this.authorService.getAuthorById(authorId).subscribe(author => {
      this.author = author;
    });
  }
}
