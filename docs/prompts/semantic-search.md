# Semantic Search

The search features of mkdocs seem to be limited to matching keywords. 
Is there a way to use embeddings to increase the quality of search? 
I know we can create embeddings for each word, phrase, sentence, paragraph and page at build time.

ChatGPT

Thought for 17 seconds

Yes, you can enhance MkDocs' search capabilities by incorporating embeddings to enable semantic search, which can significantly improve the relevance and quality of search results compared to traditional keyword-based approaches. While MkDocs' default search relies on keyword matching (typically using [Lunr.js](https://lunrjs.com/)), integrating embeddings allows the search to understand the context and meaning behind queries and documents.

### **Approaches to Implement Embedding-Based Search in MkDocs**

1.  **Using Third-Party Search Services**

    **a. Algolia DocSearch**

    -   **Overview**: Algolia's DocSearch is a popular choice for documentation sites. While it primarily uses keyword-based search, it offers advanced ranking and relevance features that can be customized to mimic some semantic capabilities.
    -   **Setup**:
        -   Apply for DocSearch here.
        -   Follow the setup instructions to integrate it with your MkDocs site.
    -   **Pros**:
        -   Easy to set up with comprehensive documentation.
        -   Fast and reliable search experience.
    -   **Cons**:
        -   Primarily keyword-based; true embedding-based semantic search would require additional customization or different services.

    **b. Typesense**

    -   **Overview**: Typesense is an open-source, typo-tolerant search engine that can be integrated with MkDocs. It supports advanced search features and can be extended for semantic search.
    -   **Setup**:
        -   Host a Typesense server or use Typesense Cloud.
        -   Use a custom script or plugin to index your MkDocs content with embeddings.
        -   Integrate the search UI with your MkDocs site.
    -   **Pros**:
        -   Open-source with flexible deployment options.
        -   Supports custom ranking and relevance tuning.
    -   **Cons**:
        -   Requires more setup and maintenance compared to managed services.
2.  **Custom Implementation with Embeddings**

    **a. Generating Embeddings at Build Time**

    -   **Process**:
        1.  **Choose an Embedding Model**: Utilize models like [Sentence Transformers](https://www.sbert.net/) or OpenAI's embedding APIs to generate embeddings.
        2.  **Build Script Integration**: Modify your MkDocs build process to include a step that processes each page (or sections within pages) to generate embeddings.
        3.  **Store Embeddings**: Save the embeddings in a JSON file or another suitable format that can be accessed by the client-side search script.
    -   **Example with Python and Sentence Transformers**:
        ```
        python
        Copy code

        `from sentence_transformers import SentenceTransformer
        import json
        import os

        model = SentenceTransformer('all-MiniLM-L6-v2')  # Choose a suitable model
        embeddings = {}

        docs_dir = 'docs'  # Your MkDocs docs directory

        for root, dirs, files in os.walk(docs_dir):
            for file in files:
                if file.endswith('.md'):
                    path = os.path.join(root, file)
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        embedding = model.encode(content).tolist()
                        page = os.path.relpath(path, docs_dir).replace('\\', '/')
                        embeddings[page] = embedding

        with open('search_embeddings.json', 'w') as f:
            json.dump(embeddings, f)
        `

        ```

    **b. Client-Side Search Interface**

    -   **Embedding Computation**: Computing embeddings directly in the browser is resource-intensive. Instead, consider precomputing embeddings for queries or leveraging lightweight models via WebAssembly or similar technologies.

    -   **Similarity Search**: Implement a similarity search mechanism (e.g., cosine similarity) to compare the query embedding with stored embeddings.

    -   **Libraries**:

        -   **TensorFlow.js**: For running lightweight models in the browser.
        -   **[faiss.js](https://github.com/erikbern/faiss)**: Though primarily for Python, alternatives for JavaScript may be needed.
    -   **Example Workflow**:

        1.  **User Enters Query**: Capture the search query input.
        2.  **Compute Query Embedding**: Use a lightweight model to generate the embedding.
        3.  **Load Precomputed Embeddings**: Fetch the `search_embeddings.json`.
        4.  **Compute Similarities**: Calculate cosine similarities between the query embedding and document embeddings.
        5.  **Display Results**: Show the top N most similar documents.
    -   **Considerations**:

        -   **Performance**: Handling large embedding files in the browser can be slow. Optimize by limiting the number of documents or using indexing techniques.
        -   **Security**: If using third-party APIs for embedding computation, ensure data privacy.
3.  **Server-Side Search with APIs**

    -   **Overview**: Offload the embedding computation and similarity search to a backend service or serverless functions.
    -   **Process**:
        1.  **Build Process**: Generate and store embeddings as in the custom implementation.
        2.  **API Setup**: Create an API endpoint that accepts search queries, computes the query embedding server-side, performs similarity search against stored embeddings, and returns the results.
        3.  **Client Integration**: Modify the MkDocs frontend to send search queries to the API and display the returned results.
    -   **Pros**:
        -   **Performance**: More efficient handling of embeddings and similarity computations.
        -   **Scalability**: Easier to manage larger datasets.
    -   **Cons**:
        -   **Infrastructure**: Requires hosting and maintaining the backend service.
        -   **Latency**: Potential delays due to network requests.
4.  **Leveraging MkDocs Plugins**

    -   **Current State**: As of the latest updates, there may not be a widely-adopted MkDocs plugin specifically for embedding-based search. However, you can develop a custom plugin or adapt existing search plugins to incorporate embeddings.

    -   **Developing a Custom Plugin**:

        -   **Functionality**:
            -   Integrate the embedding generation step into the MkDocs build process.
            -   Modify the search index to include embedding data.
            -   Enhance the frontend search script to utilize embeddings for query processing and result ranking.
        -   **Resources**:
            -   Refer to the MkDocs plugin development guide for creating custom plugins.
    -   **Example Resources**:

        -   **mkdocs\-material**: This popular MkDocs theme offers advanced search features and might serve as a foundation for customization.

### **Challenges and Considerations**

-   **Performance**: Embedding-based search, especially on the client side, can be resource-intensive. Optimizing embedding sizes and search algorithms is crucial.

-   **Complexity**: Implementing semantic search requires a good understanding of machine learning models, embedding generation, and efficient search algorithms.

-   **Hosting and Infrastructure**: Depending on the chosen approach, you might need additional hosting for search services or backend APIs.

-   **Maintenance**: Custom solutions may require ongoing maintenance to handle updates in models, dependencies, or MkDocs versions.

### **Conclusion**

While MkDocs does not natively support embedding-based search, enhancing its search functionality with embeddings is achievable through custom implementations or integrating third-party services. This enhancement can provide a more intuitive and context-aware search experience for your documentation users. Depending on your resources and technical expertise, you can choose between leveraging existing search platforms, developing a custom MkDocs plugin, or setting up a server-side search infrastructure to incorporate embeddings effectively.

If you're looking for a more straightforward solution and don't require full semantic capabilities, consider exploring advanced configurations of existing search plugins or services that offer improved relevance without the complexity of embeddings.

### **Additional Resources**

-   **Sentence Transformers**: <https://www.sbert.net/>
-   **OpenAI Embeddings API**: <https://platform.openai.com/docs/guides/embeddings>
-   **MkDocs Plugin Development**: https://www.mkdocs.org/dev\-guide/plugins/
-   **Algolia DocSearch**: https://docsearch.algolia.com/
-   **Typesense**: <https://typesense.org/>