<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // $posts = Post::latest()->simplePaginate(4);
        $posts = Post::latest()->paginate(4);
        // $links = $posts->links();
        // dd($posts->links());
        return Inertia::render('Posts', [
            'posts' => $posts,
            // 'links' => $posts->links(),
            // 'posts' => Post::latest()->paginate(4)
            // 'posts' => Post::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'nullable|image|max:2048', // Validate that picture is an image
        ]);
    
        $data = $request->only(['title', 'content']);
    
        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            // $filename = time() . '_' . $file->getClientOriginalName();
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // Store the file in the "public/uploads" directory
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/' . $path;
        }
    
        Post::create($data);
    
        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Post', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'nullable|image|max:2048', // Validate that picture is an image
        ]);
    
        $data = $request->only(['title', 'content']);
    
        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            // $filename = time() . '_' . $file->getClientOriginalName();
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // Store the file in the "public/uploads" directory
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/' . $path;
        }

        // update the post
        $post->update($data);
    
    
        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
