class StoriesController < ApplicationController
require 'eventmachine'
require 'faye'

  # GET /stories
  # GET /stories.json
  def index
    @stories = Story.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @stories }
    end
  end

  # GET /stories/1
  # GET /stories/1.json
  def show
    @story = Story.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/new
  # GET /stories/new.json
  def new
    @story = Story.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/1/edit
  def edit
    @story = Story.find(params[:id])
  end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(params[:story])

    respond_to do |format|
      if @story.save
	  
		message = {:channel => "/boards/#{@story.boardid}", :data => { :text=>@story.to_json, :destroy=>false.to_json}}
		uri = URI.parse("http://faye.dev-ice.com/faye")
		
		puts(@story.to_json)
		Net::HTTP.post_form(uri, :message => message.to_json)
		
        format.html { redirect_to @story, notice: 'Story was successfully created.' }
        format.json { render json: @story, status: :created, location: @story }
      else
        format.html { render action: "new" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /stories/1
  # PUT /stories/1.json
  def update
    @story = Story.find(params[:id])

    respond_to do |format|
      if @story.update_attributes(params[:story])
        
		message = {:channel => "/boards/#{@story.boardid}", :data => { :text=>@story.to_json, :destroy=>false.to_json}}
		uri = URI.parse("http://faye.dev-ice.com/faye")
		
		Net::HTTP.post_form(uri, :message => message.to_json)
		
		format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    @story = Story.find(params[:id])
    
	message = {:channel => "/boards/#{@story.boardid}", :data => { :text=>@story.to_json, :destroy=>true.to_json}}
	uri = URI.parse("http://faye.dev-ice.com/faye")
		
	Net::HTTP.post_form(uri, :message => message.to_json)
	@story.destroy
    respond_to do |format|
      format.html { redirect_to stories_url }
      format.json { head :no_content }
    end
  end
end
